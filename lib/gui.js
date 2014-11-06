define(['npm:underscore', 'npm:dat-gui', 'npm:rxjs', 'HEcosystem/data'], function (_, dat, Rx, dataModule) {
    console.log("entering module gui.js");


    var gui = new dat.GUI(),
        nodeGroupPrefix = "group-",
        linkGroupPrefix = "link-group-",
        propObj = {},
        subject,
        classificationsFolders = [],
        classifiersDropdownOptions,
        groupingFolder,
        linkTypeFolder,
        data;

    var getFilters = function () {
        return propObj;
    };

    var getGrouping = function () {
        "use strict";
        return _.chain(_.range(0, 3))
            .map(function (index) {
                return propObj["grouping-level-" + index];
            }).filter(function (v) {
                return v;
            }).value();
    };

    var addCheckboxToFolder = function (parameters) {
        "use strict";
        var folder = parameters.folder,
            key = parameters.key,
            name = parameters.name;

        propObj[key] = !!parameters.initialValue;
        folder.add(propObj, key).name(name);
    };

    var addClassificationFilteringFolder = function (classifier) {
        "use strict";
        var folder = gui.addFolder(classifier.name);

        var names = data.getClassifierPossibleValues(classifier["classifier-id"]);
        _(names).each(function (name) {
            addCheckboxToFolder({
                folder: folder,
                key: classifier["classifier-id"] + name,
                name: name,
                initialValue: true
            });
        });
    };

    data = dataModule.getData();
    subject = new Rx.Subject();

    _(data.classifiers).each(function (classifier) {
        "use strict";
        classificationsFolders[classifier["classifier-id"]] = addClassificationFilteringFolder(classifier);
    });

    classifiersDropdownOptions = _.chain([
        ["Unselected", false]
    ])
        .union(data.classifiers
            .map(function (classifier) {
                "use strict";
                return [classifier["name"], classifier["classifier-id"]];
            }))
        .object()
        .value();

    groupingFolder = gui.addFolder("Grouping");
    _.chain(_.range(0, 3)).each(function (index) {
        "use strict";
        var key = "grouping-level-" + index;
        propObj[key] = false;
        groupingFolder
            .add(propObj, key, classifiersDropdownOptions)
            .onChange(function (value) {
                subject.onNext({});
            });
    });

    linkTypeFolder = gui.addFolder("Link types");
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
