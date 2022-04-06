 function max(iterable, key) {
    var maximum = key(iterable[0]);
    for (var i in iterable) {
        var keyedOutput = key(i);
        if (keyedOutput >= maximum) {
            maximum = iterable[i]
        }
    }
    return maximum
}

const reverser = (value) => value * -1; 

const thiser = { // is this even possible
    a: Math.random() * 100, 
    b: Math.random() * 100, 
    x: Math.random() * 100, 
    y: Math.random() * 100, 
}
thiser['distance'] = Math.sqrt((thiser.x-thiser.a)**2 + (thiser.y-thiser.b)**2);
// console.log(thiser);

function changer(object, key, value) {
    var prev = object[key];
    if (Array.isArray(prev)) {
        object.append(value)
    } else if (typeof prev == 'object' && prev != null) {
        object.key.key = value;  
    } else {
        object.key = value;
    }
}

async function promise_me(truthy) {
    const a = new Promise((resolve, reject) => {
        console.log(1);
        resolve(5)
    })
    console.log(2);
    console.log(3);
    console.log(4);
    const five = await a;
    console.log(five);
    return five
} 
promise_me(true);