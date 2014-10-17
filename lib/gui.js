/**
 * Created by ynosa on 14.04.14.
 */
define(['npm:underscore', 'npm:dat-gui', 'npm:rxjs', 'HEcosystem/data'], function (_, dat, Rx, dataModule) {
    console.log("entering module gui.js");


    var gui = new dat.GUI(),
        nodeGroupPrefix = "class-",
        linkGroupPrefix = "link-type-",
        classGroupPrefix = "class-grouping-",
        propObj = {},
        subject,
        classificationGroupingFolder,
        classificationFilterFolders,
        linkTypeFolder,
        data;

    var getFilters = function () {
        return propObj;
    };

    var getGrouping = function () {
        "use strict";
        return ["technology"];
    }

    data = dataModule.getData();
    subject = new Rx.Subject();

    classificationFilterFolders = _.chain(data.nodeGroups).keys().map(function (key) {return [key,gui.addFolder("Class:"+key)]}).object().value();

    classificationGroupingFolder = gui.addFolder("Grouping");
    linkTypeFolder = gui.addFolder("Link types");

    for (var i=0;i<3;i++)
    {
        propObj[classGroupPrefix+i] = "...";
        classificationGroupingFolder.add(propObj,classGroupPrefix+i, _.union(_(data.nodeGroups).keys(),"...")).name("level "+i);
    }
//    _.range(3).each(function (i) {
//      propObj[classGroupPrefix+i] = "...";
//      classificationGroupingFolder.add(propObj,classGroupPrefix+i,_(data.nodeGroups).keys()).name("level "+i);
//    });

//    _.chain(data.nodeGroups).map(function (classAttr) {
//        return {key: classGroupPrefix + classAttr.classification+"-"+classAttr.option,
//                name: classAttr};})
//        .each(function () {
//            propObj[mappedLinkGroup.key] = true;
//            linkTypeFolder.add(propObj, mappedLinkGroup.key).name(mappedLinkGroup.name)
//                .onChange(function (mappedLinkGroup) {
//                    return function (value) {
//                        subject.onNext({
//                            mappedGroup: mappedLinkGroup,
//                            value: value
//                        });
//
//                    };
//                }(mappedLinkGroup)
//        );
     //   });
//

          _(data.nodeGroups).chain().pairs()
                            .map(function(classWithOptions){ return _(classWithOptions[1]).map(function(option){ return {classification: classWithOptions[0], option: option}}) })
                            .flatten(true)
                            .map(function (option) {
                                return _.extend(option,{key: nodeGroupPrefix + option.classification +"-" +option.option});})
                            .each(function (mappedOption) {
                                propObj[mappedOption.key] = true;
                                classificationFilterFolders[mappedOption.classification].add(propObj, mappedOption.key).name(mappedOption.option)
                                .onChange(function (option) {
                                    return function (value) {
                                    subject.onNext({
                                    option: option,
                                    value: value});};
                            }(mappedOption));
        });

    _.chain(data.linkGroups).map(function (linkGroup) {
        return {key: linkGroupPrefix + linkGroup.type,
                name: linkGroup.type};
    }).each(function (mappedLinkGroup) {
            propObj[mappedLinkGroup.key] = true;
            linkTypeFolder.add(propObj, mappedLinkGroup.key).name(mappedLinkGroup.name)
                .onChange(function (mappedLinkGroup) {
                    return function (value) {
                        subject.onNext({
                            mappedGroup: mappedLinkGroup,
                            value: value
                        });

                    };
                }(mappedLinkGroup));
        });

    gui.remember(propObj);

    console.log("exiting module gui.js");

    return {
        events: subject,
        query: {
            nodeGroupPrefix: nodeGroupPrefix,
            linkGroupPrefix: linkGroupPrefix,
            getFilters: getFilters,
            getGroupings: getGrouping
        }
    }
});
