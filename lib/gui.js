/**
 * Created by ynosa on 14.04.14.
 */
define(['npm:underscore', 'npm:dat-gui', 'npm:rxjs', 'HEcosystem/data'], function (_, dat, Rx, dataModule) {
    console.log("entering module gui.js");


    var gui = new dat.GUI(),
        nodeGroupPrefix = "group-",
        linkTypePrefix = "type-",
        propObj = {},
        subject,
        nodeGroupFolder,
        linkTypeFolder,
        data;

    data = dataModule.getData();

    subject = new Rx.Subject();

    nodeGroupFolder = gui.addFolder("Technology groups");
    linkTypeFolder = gui.addFolder("Link types");


    var getFilters = function () {
        return propObj;
    };

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

    gui.remember(propObj);

    console.log("exiting module gui.js");

    return {
        events: subject,
        filters: {
            nodeGroupPrefix: nodeGroupPrefix,
            getFilters: getFilters
        }
    }
});
