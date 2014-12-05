define(['npm:underscore', 'npm:dat-gui', 'npm:rxjs', 'HEcosystem/data'], function (_, dat, Rx, dataModule) {
    console.log("entering module gui.js");

    var gui = new dat.GUI(),
        nodeGroupPrefix = "group-",
        linkPrefix = "link-",
        propObj = {},
        subject,
        classificationsFolders = [],
        classifiersDropdownOptions,
        groupingFolder,
        linkTypeFolder,
        data;

    data = dataModule.getData();
    subject = new Rx.Subject();

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
        return folder.add(propObj, key).name(name).onChange(function (key) {
            return function (value) {
                subject.onNext({
                    classFilteringChanged: true,
                    value: value,
                    key: key
                });
            };
        }(key));
    };

    var addClassificationFilteringFolder = function (classifier) {
        "use strict";
        var folder = gui.addFolder(classifier.name);

        var classifierIds = data.getClassifierPossibleValues(classifier["classifier-id"]);
        _(classifierIds).each(function (name) {
            addCheckboxToFolder({
                folder: folder,
                key: classifier["classifier-id"] + name,
                name: name,
                initialValue: true
            });
        });
    };

    _(data.classifiers).each(function (classifier) {
        "use strict";
        classificationsFolders[classifier["classifier-id"]] = addClassificationFilteringFolder(classifier);
    });

    classifiersDropdownOptions = _.chain([
        ["Unselected", ""]
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
    _.chain(data.links).map(function (link) {
        return {key: linkPrefix + link["link-id"],
            name: link.name};
    }).each(function (mappedLink) {
        propObj[mappedLink.key] = true;
        linkTypeFolder
            .add(propObj, mappedLink.key)
            .name(mappedLink.name)
            .onChange(function (linkType) {
                return function (value) {
                    subject.onNext({
                        mappedGroup: linkType,
                        value: value
                    });

                };
            }(mappedLink));
    });

    gui.remember(propObj);

    console.log("exiting module gui.js");

    return {
        events: subject,
        query: {
            nodeGroupPrefix: nodeGroupPrefix,
            linkPrefix: linkPrefix,
            getFilters: getFilters,
            getGroupings: getGrouping
        }
    }
});
