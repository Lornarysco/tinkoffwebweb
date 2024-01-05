
// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const [secondName, firstName] = fio.split(" ");
    return firstName + ' ' + secondName;
}

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    const set = new Set(array);
    return Array.from(set);
}



// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    return Math.max(...array) / Math.min(...array);
}

// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor(){
        this.dict = new Map();
    }
    add(key, value){
        if(typeof(key) === 'string' && typeof(value) === 'string'){
            this.dict.set(key.toLowerCase(), value.toLowerCase());
        }
        else console.log('Ключ или значение не String!!!');
    }
    getValue(key){
        if(typeof(key) === 'string' && this.dict.has(key.toLowerCase())) {
            return this.dict.get(key.toLowerCase());
        }
        else console.log("Нет такого ключа");
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};