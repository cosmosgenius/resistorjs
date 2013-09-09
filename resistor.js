(function (exports){
    /**
     * Returns the color for a resistor band value
     * @param  {string} value resistor band value between -2 to 9
     * @return {string}       color corresponding to that value
     */
    function getcolor(value){
        var color = {'-2': "silver",
                '-1': "gold",
                '0': "black",
                '1': "brown",
                '2': "red",
                '3': "orange",
                '4': "yellow",
                '5': "green",
                '6': "blue",
                '7': "violet",
                '8': "grey",
                '9': "white"};
        return color[value];
    }

    /**
     * Returns the color corresponding to the tolerance value
     * @param  {string} tol tolerance
     * @return {string}     color corresponding to the tolerance value
     */
    function getToleranceColor(tol){
        var tolerance_color={
            '5':'gray',
            '10':'violet',
            '25':'blue',
            '50':'green',
            '100':'brown',
            '200':'red',
            '500':'gold',
            '1000':'silver',
            '2000':''
        };
        var val = (+tol) * 100;
        if(val in tolerance_color){
            return tolerance_color[val];
        }
        return '-1';
    }

    /**
     * Return the color bands
     * @param  {String}     resistor_value resistor value
     * @param  {double}     tol      tolerance value
     * @param  {interger}   mul      multiplier([0,3,6])
     * @return {Dict object}         band color
     */
    exports.resistorToColor = function (resistor_value, tol, mul){
        var digit = [0, 0, 0],
            digits = [],
            dec = -1,
            mul = {
                value:'',
                pos:''
            },
            multiplier;
        if (!resistor_value){
            throw ("resistor: invalid parameter");
        }
        resistor_value = String(resistor_value).replace(/^0*/,'');
        tol = tol || 5;
        mul = mul || null;
        var significant_digit = tol > 2 ? 2 : 3;
        if(/[kK]/.test(resistor_value)){
            mul['value'] = 100000;
        }else if(/[mM]/.test(resistor_value)){
            mul['value'] = 100000000;
        }else{
            mul['value'] = 100;
        }
        if(/[.]/.test(resistor_value)){
            resistor_value = resistor_value.replace(/[rRkKmM]/,'');
        }else{
            resistor_value = resistor_value.replace(/[rRkKmM]/,'.');
        }
        resistor_value = (""+ +(+resistor_value * mul['value']).toFixed(4));
        for (var i = 0 ; i< significant_digit ; i++){
            digits.push(resistor_value[i]?resistor_value[i]:0);
        }
        multiplier = resistor_value.length - significant_digit - 2;
        if(significant_digit == 2){
            return {
                'band1':getcolor(digits[0]),
                'band2':getcolor(digits[1]),
                'band3':getcolor(multiplier),
                'band4':'',
                'band5':getToleranceColor(tol)
            };
        }
        return {
            'band1':getcolor(digits[0]),
            'band2':getcolor(digits[1]),
            'band3':getcolor(digits[2]),
            'band4':getcolor(multiplier),
            'band5':getToleranceColor(tol)
        };
    };

})(typeof exports === "undefined" ?this['resistor'] = {}:exports);
