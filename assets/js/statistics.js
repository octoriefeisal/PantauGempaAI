let chart;

function renderStatistics(data){

    const minor =
        data.filter(q=>q.properties.mag <3).length;

    const light =
        data.filter(q=>q.properties.mag>=3 && q.properties.mag<5).length;

    const strong =
        data.filter(q=>q.properties.mag>=5 && q.properties.mag<7).length;

    const extreme =
        data.filter(q=>q.properties.mag>=7).length;

    const ctx =
        document
        .getElementById("magnitudeChart");

    if(chart){

        chart.destroy();

    }

    chart = new Chart(ctx,{

        type:"bar",

        data:{

            labels:[
                "Minor",
                "Light",
                "Strong",
                "Extreme"
            ],

            datasets:[{

                label:"Jumlah Gempa",

                data:[
                    minor,
                    light,
                    strong,
                    extreme
                ]

            }]

        }

    });

}