define([
], function () {
    "use strict";
    
    var distanceSquaredBetween = function (a, b) {
        if (a.length === b.length) {
            return a.map(function (aElement, index) {
                return Math.pow(aElement - b[index], 2);
            }).reduce(function (c, d) {
                return c + d;
            });
        }
    };
    
    var distanceBetween = function (a, b) {
        var squared = distanceSquaredBetween(a, b);
        
        if (squared) {
            return Math.sqrt(squared);
        }
    };
    
    var dot = function (a, b) {
        if (a.length === b.length) {
            return a.map(function (aElem, index) {
                return aElem * b[index];
            }).reduce(function (c, d) {
                return c + d;
            });
        }
    };
    
    var dup = function (vec) {
        return vec.map(function (val) {
            return val;
        });
    };

    var modulus = function (vec) {
        // Remember, pass vec twice to dot
        return Math.sqrt(dot(vec, vec));
    };
    
    var toUnitVector = function (vec) {
        var r = modulus(vec);
        
        if (r === 0) {
            return dup(vec);
        }
        
        return vec.map(function (x) {
            return x / r;
        });
    };
    
    var angleBetween = function (a, b) {
        // See http://chortle.ccsu.edu/vectorlessons/vch10/vch10_5.html
        // We are dealing with non-unit vectors so...
        // (1) normalize each vector
        var normA = toUnitVector(a);
        var normB = toUnitVector(b);
                
        // (2) compute the dot product
        var product = dot(normA, normB);
        
        // (3) take the arc cos to get the angle.
        return Math.acos(product);
    };
    
    return {
        distanceBetween: distanceBetween,
        distanceSquaredBetween: distanceSquaredBetween,
        dot: dot,
        dup: dup,
        modulus: modulus,
        angleBetween: angleBetween
    };
});