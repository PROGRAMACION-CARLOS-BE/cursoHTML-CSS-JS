$(document).ready(function() {

    var gManifestName = location.href.replace("install.html","") + 'manifest.webapp';

    var request = navigator.mozApps.checkInstalled(gManifestName);

    request.onsuccess = function() {
        if (request.result) {
            // La app ya fue instalada.
            $("#install").text("La app ya está instalada");

        } else {

            // La app no esta instalada
            $("#install").html("<input type='button' value='Instalar'>");

            $("#install").click(function() {

                var req = navigator.mozApps.install(gManifestName);

                req.onsuccess = function(data) {
                    $("#install").text("La app ha sido instalada").unbind('click');
                }

                req.onerror = function(errObj) {
                    alert("Error de instalacion: " + this.error.name);
                }

            });
        }
    }

    request.onerror = function() {
        alert('Error comprobando estado de la instalacion: ' +
        this.error.message);
    }
});
