window.onload = function() {

    //get public ip address via axios
    /*axios.get('https://api.ipify.org?format=json')
        .then(function(response) {
            //get ip address
            var ip = response.data.ip;
            axios.get(`http://ip-api.com/json/${ip}`)
                .then(function(response) {
                    var cidade = response.data.city;
                    var estado = response.data.region;
                    var rua = response.data.district;
                    var pais = response.data.country;

                    const fullAdress = `${cidade}, ${estado} ${rua ? ' - ' + rua : '' } - ${pais}`;
                    document.getElementById('my-address').innerHTML = fullAdress;
                })
                .catch(function(error) {
                    console.log('erro ao tentar peggar o endereço via ip: ', error);
                });

        })
        .catch(function(error) {
            console.log('Erro ao tentar solicitar seu endereço IP: ', error);
        });*/

    console.log('WhatsApp Clone!');

}