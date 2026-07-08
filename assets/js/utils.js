function getMagnitudeLevel(mag){

    if(mag >= 7){

        return {
            level:"EXTREME",
            color:"#d32f2f"
        };

    }

    if(mag >= 5){

        return{
            level:"STRONG",
            color:"#f57c00"
        };

    }

    if(mag >= 3){

        return{
            level:"LIGHT",
            color:"#fbc02d"
        };

    }

    return{

        level:"MINOR",
        color:"#43a047"

    };

}

function getTsunamiStatus(tsunami){

    return tsunami === 1
        ? "🌊 Potential Tsunami"
        : "🌊 No Tsunami";

}