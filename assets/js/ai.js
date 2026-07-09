function analyzeEarthquake(quake){

    const mag = quake.properties.mag || 0;

    const depth = quake.geometry.coordinates[2];

    const tsunami = quake.properties.tsunami;

    let risk = "";
    let explanation = "";
    let recommendation = "";

    // Risk Level
    if(mag >= 7){

        risk = "🔴 EXTREME";

    }else if(mag >= 5){

        risk = "🟠 HIGH";

    }else if(mag >= 3){

        risk = "🟡 MEDIUM";

    }else{

        risk = "🟢 LOW";

    }

    // Explanation
    if(depth < 70){

        explanation =
        "Gempa tergolong dangkal sehingga guncangan di permukaan dapat terasa lebih kuat.";

    }else{

        explanation =
        "Gempa tergolong dalam sehingga dampak guncangan di permukaan biasanya lebih kecil.";

    }

    // Recommendation
    if(tsunami === 1){

        recommendation =
        "Segera ikuti informasi resmi dari otoritas setempat mengenai potensi tsunami.";

    }else{

        recommendation =
        "Tetap pantau informasi resmi dan waspadai kemungkinan gempa susulan.";

    }

    return {

        risk,

        explanation,

        recommendation

    };

}