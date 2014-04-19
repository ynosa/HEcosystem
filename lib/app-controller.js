/**
 * Created by ynosa on 17.04.14.
 */
define(['HEcosystem/app2', 'HEcosystem/gui', 'HEcosystem/data'], function (app2, gui, data) {
    console.log("app-controller: Entering");

    gui.events.subscribe(
        function (x) {
            console.log('onNext: ' + x);
            //  filteredData apply filtering from x

            var filteredData = data.getData(gui.filters);
            app2.updateNodes(filteredData);
        },
        function (e) {
            console.log('onError: ' + e.message);
        },
        function () {
            console.log('onCompleted');
        }
    );

    app2.start(data.getData());

    console.log("app-controller: Exiting");
});