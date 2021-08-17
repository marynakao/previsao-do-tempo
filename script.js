// Aprendendo a fazer requisição interna. Possibilita a comunicação com diversos serviços.
// async = funcão assíncrona

document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    // algo foi digitado
    if (input !== ' ') {
    clearInfo(); // limpa a tela para exibir somente o carregando após outra pesquisa

        showWarning('Carregando...');
        
        // encodeURI transforma o input em código de pesquisa url
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=df0dbedef4676649bc0a5d6bd5084618&units=metric&lang=pt_br`;

        let results = await fetch(url);

        // peguei a url e vou transformar o resultado em objeto JS
        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
                /*feelLike: json.main.feels_like,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min*/
            });
        }
        else {
            showWarning('Não foi possível encontrar esta localização');
        }
    } 
});
// exibe as infos de tempo
function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    // altera o icon
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    
    //altera o angulo da rotação do vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90})deg`;

    document.querySelector('.resultado').style.display = 'block';
}
// limpa a tela para exibir somente o aviso de não encontrado
function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};