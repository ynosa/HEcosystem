/**
 * Created by ynosa on 14.04.14.
 */
define(['npm:underscore', 'npm:dat-gui', 'HEcosystem/data'], function (_, dat, data) {
    var gui = new dat.GUI(),
//    var properties =
//    {
//        weightSource: ["Commit","Ages"],
//        groups: ["fs","mr"]
//    };

        propObj = {};

// var controllerObjects = {};

//    controller["size"]=gui.add(properties, "size" );
//    controller["weightSource"]=gui.add(properties, "weightSource",["Community size","Official forum"] );


    var folder = gui.addFolder("Groups");

    _.chain(data.nodeGroups).map(function (group) {
        return "group" + "-" + group.id;
    }).each(function (mappedGroup) {
            propObj[mappedGroup] = true;
            folder.add(propObj, mappedGroup);
        });


    gui.remember(properties);

    return {
        subscribe: function (callback, event) {
            controller[event].onChange(callback);
        }
    }
});
