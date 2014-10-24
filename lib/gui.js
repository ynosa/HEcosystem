define(['npm:underscore', 'npm:dat-gui', 'npm:rxjs', 'HEcosystem/data'], function (_, dat, Rx, dataModule) {
    console.log("entering module gui.js");


    var gui = new dat.GUI(),
        nodeGroupPrefix = "group-",
        linkGroupPrefix = "link-group-",
        propObj = {},
        subject,
        nodeGroupFolder,
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

    nodeGroupFolder = gui.addFolder("Technology groups");
    linkTypeFolder = gui.addFolder("Link types");

    _.chain(data.nodeGroups).map(function (nodeGroup) {
        return {key: nodeGroupPrefix + nodeGroup.id,
                name: nodeGroup.name};
    }).each(function (mappedNodeGroup) {
            propObj[mappedNodeGroup.key] = true;
            nodeGroupFolder.add(propObj, mappedNodeGroup.key).name(mappedNodeGroup.name)
                .onChange(function (mappedGroup) {
                    return function (value) {
                        subject.onNext({
                            mappedGroup: mappedGroup,
                            value: value
                        });

                    };
                }(mappedNodeGroup));
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
