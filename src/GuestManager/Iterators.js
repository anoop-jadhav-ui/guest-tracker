function* idGenerator(){
    while(true)
    yield Math.floor(100000 + Math.random() * 900000);
}

export const getId = idGenerator();
