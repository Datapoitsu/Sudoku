// -------------------- Sudoku -------------------- //
//Written by: Aarni Junkkala
var width = 0;
var height = 0;

function getRowIndex(cellIndex)
{
    return (cellIndex - (cellIndex % (width * height))) / (width * height);
}

function getColumnIndex(cellIndex)
{
    return cellIndex % (width * height);
}

function getBandIndex(cellIndex)
{
    cellIndex = getRowIndex(cellIndex);
    cellIndex = (cellIndex - cellIndex % height) / height;
    return cellIndex;
}

function getStackIndex(cellIndex)
{
    cellIndex = getColumnIndex(cellIndex);
    cellIndex = (cellIndex - cellIndex % width) / width;
    return cellIndex;
} 

function getBlockIndex(cellIndex)
{
    return getStackIndex(cellIndex) + getBandIndex(cellIndex) * height;
}


function getRowIndexes(cellIndex)
{
    return Array.from({length: width * height}, (_, i) => i + getRowIndex(cellIndex) * width * height);
}

function getColumnIndexes(cellIndex)
{
    return Array.from({length: width * height}, (_, i) => getColumnIndex(cellIndex) + (width * height * i));
}

function getBlockIndexes(cellIndex)
{
    var rootIndex = getStackIndex(cellIndex) * width + getBandIndex(cellIndex) * width * Math.pow(height,2);
    var arr = [];
    for(var i = 0; i < height; i++)
    {
        for(var j = 0; j < width; j++)
        {
            arr.push(rootIndex + j + i * width * height);
        }
    }
    return arr;
}

function getRow(table,cellIndex)
{
    return table.slice(getRowIndex(cellIndex) * width * height, getRowIndex(cellIndex) * width * height + width * height);
}

function getColumn(table,cellIndex)
{
    var arr = [];
    for(var i = 0; i < width * height; i++)
    {
        arr.push(table[getColumnIndex(cellIndex) + (width * height) * i]);
    }
    return arr;
}

function getBlock(table,cellIndex)
{
    var arr = [];
    for(var j = 0; j < height; j++)
    {
        for(var i = 0; i < width; i++)
        {
            arr.push(table[getBandIndex(cellIndex) * width * Math.pow(height,2) + getStackIndex(cellIndex) * width + i + j * width * height]);
        }
    }
    return arr;
}

function getPossibleNumbers(table,cellIndex)
{
    var rowNumbers = getRow(table,cellIndex);
    var columnNumbers = getColumn(table,cellIndex);
    var blockNumbers = getBlock(table,cellIndex);
    var arr = [];
    for(var i = 1; i < width * height + 1; i++)
    {
        if(!rowNumbers.includes(i) && !columnNumbers.includes(i) && !blockNumbers.includes(i))
        {
            arr.push(i);
        }
    }
    return arr;
}

function unique(table)
{
    
    var holder = [];
    for(var i = 0; i < table.length; i++)
    {
        if(!holder.includes(table[i])){
            holder.push(table[i]);
        }
    }
    return holder;
}

function smallestIndex(table)
{
    var smallestIndex = 0;
    var smallestSize = table[0].length;
    for(var i = 1; i < table.length; i++)
    {
        if(table[i].length < smallestSize)
        {
            smallestIndex = i;
            smallestSize = table[i].length;
        }
    }
    return smallestIndex;
}

function calculateNumbers()
{
    let numbers = Array(Math.pow(width * height, 2)).fill(0);
    let possibleNumbers = [];
    var nums = [];
    for(var i = 1; i < width * height + 1; i++)
    {
        nums.push(i);
    }

    for(var i = 0; i < Math.pow(width * height, 2); i++)
    {
        possibleNumbers.push(nums.slice());
    }

    var index = Math.floor(Math.random() * (Math.pow(width * height, 2) - 1));
    for(var i = 0; i < Math.pow(width * height ,2); i++)
    {
        var rand = Math.floor(Math.random() * (possibleNumbers[index].length - 1));
        numbers[index] = possibleNumbers[index][rand];
        possibleNumbers[index] = Array(width * height + 1).fill(-1);
        
        var arr = unique(getRowIndexes(index).concat(getColumnIndexes(index),getBlockIndexes(index)));
        for(let j = 0; j < arr.length; j++)
        {
            if(possibleNumbers[arr[j]].length < width * height + 1)
            {
                possibleNumbers[arr[j]] = getPossibleNumbers(numbers,arr[j]);
            }
        }
        index = smallestIndex(possibleNumbers);
        if(possibleNumbers[index].length == 0)
        {
            return calculateNumbers();
        }
    }
    return numbers;
}

function newBoard(boardWidth, boardHeight, dissappearanceRate)
{
    width = boardWidth
    height = boardHeight;
    
    var numbers = calculateNumbers();
    removeNumbers(numbers,dissappearanceRate);
    setNumbers(numbers);
}

function canBeRemoved(uniqueArr,number)
{
    if(number <= 0 || number > uniqueArr.length)
    {
        return false;
    }

    var isZero = false;
    for(var i = 0; i < uniqueArr.length; i++)
    {
        if(uniqueArr[i] == 0)
        {
            isZero = true;
            break;
        }
    }

    if(uniqueArr[number - 1] == 1 && isZero == true)
    {
        return false;
    }
    return true;
}

function removeNumbers(table,dissappearanceRate)
{
    var count = Math.floor(table.length * dissappearanceRate);
    var size = Math.sqrt(Math.sqrt(table.length));
    //Limits the count so there will always be one of each number except a random one.
    if(count > table.length - size*size + 1)
    {
        count = table.length - size*size + 1;
    }
    var uniqueArr = Array(Math.sqrt(table.length)).fill(0);
    for(var i = 0; i < table.length; i++)
    {
        uniqueArr[table[i] - 1] += 1;
    }
    var index = Math.floor(Math.random() * table.length);
    for(var i = 0; i < count; i++)
    {
        while(!canBeRemoved(uniqueArr,table[index]))
        {
            index = Math.floor(Math.random() * table.length);
        }
        uniqueArr[table[index] - 1] -= 1;
        table[index] = 0;
    }
}

function setNumbers(table)
{
    //Putting numbers into the board
    for(var i = 0; i < table.length; i++)
    {
        if(table[i] != 0)
        {
            document.getElementById(i.toString()).value = table[i];
            document.getElementById(i.toString()).style.color = "#567ab8";
            document.getElementById(i.toString()).disabled = true;
        }
    }
}

function CheckSudoku(table) //This function should only be called when all cells have a number
{
    console.log("Checking rows", width,height);
    //Check rows.
    for(var row = 0; row < width * height; row++)
    {
        if(CheckNumbers(table.slice(row * width * height, (row+1) * width * height)) == false)
        {
            return false;
        }
    }
    console.log("Checking columns");
    //Check columns.
    for(var column = 0; column < width * height; column++)
    {
        var arr = [];
        for(var i = 0; i < width * height; i++)
        {
            arr.push(table[i * width * height + column]);
        }
        if(CheckNumbers(arr) == false)
        {
            return false;
        }
    }
    
    console.log("checking squares");
    //Check squares.
    for(var squareH = 0; squareH < width; squareH++)
    {
        for(var squareW = 0; squareW < height; squareW++)
        {
            var arr = [];
            var arr2 = [];
            //Tunge neliön luvut listaan.
            for(var w = 0; w < width; w++){
                for(var h = 0; h < height; h++){
                    arr.push(table[squareW * width + squareH * (width * width * height) + w + h * (width * height)]);
                    arr2.push(squareW * width + squareH * (width * width * height) + w + h * (width * height));
                }
            }
            if(CheckNumbers(arr) == false){
                return false;
            }
        }
    }
    return true;
}

function CheckNumbers(numbers)
{
    if(numbers.length != width * height)
    {
        return false;
    }
    numbers.sort();
    correctArray = [];
    for(var i = 0; i < numbers.length; i++)
    {
        correctArray.push(i+1);
    }
    for(var i = 0; i < numbers.length; i++)
    {
        if(numbers[i] != correctArray[i])
        {
            return false;
        }
    }
    return true;
}

function printSudoku(table){
    var size = Math.sqrt(Math.sqrt(table.length));
    console.log("Printing sudoku");
    for(var i = 0; i < Math.pow(size,2);i++){
        console.log(table.slice(i*Math.pow(size,2),(i+1)*Math.pow(size,2)))
    }
}

function addEvent(element, eventName, callback)
{
    if (element.addEventListener)
    {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent)
    {
        element.attachEvent("on" + eventName, callback);
    } else
    {
        element["on" + eventName] = callback;
    }
}

addEvent(document, "keyup", function (e) {
    e = e || window.event;
    check();
});

function generateNewBoard(disapperanceRate,difficultyName)
{
    //New board
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    if(width == '')
    {
        width = 3;
    }
    if(width < 2)
    {
        width = 2;
    }
    if(height == '')
    {
        height = 3;
    }
    if(height < 2)
    {
        height = 2;
    }
    newDOMBoard(width,height);

    document.getElementById("difficultyText").innerHTML = difficultyName;
    for(var i = 0; i < Math.pow(width * height,2); i++){
        document.getElementById(i.toString()).disabled = false;
        document.getElementById(i.toString()).value = null;
    }
    newBoard(width,height,disapperanceRate);
}

function reset()
{
    for(let i = 0; i < Math.pow(width*height,2); i++)
    {
        if(document.getElementById(i.toString()).disabled == false)
        {
            document.getElementById(i.toString()).value = null;
        }
    }
}

function check(){
    var arr = [];
    for(var i = 0; i < Math.pow(width * height,2); i++)
    {
        if(document.getElementById(i.toString()).value == null)
        {
            return;
        }
        arr.push(document.getElementById(i.toString()).value);
    }
    if(CheckSudoku(arr))
    {
        console.log("You Won!");
        for(var i = 0; i < Math.pow(width*height,2); i++)
        {
            var element = document.getElementById(i.toString())
            element.disabled = true;
            element.style.backgroundColor = "#5aa15b";
        }
    }
}

function newDOMBoard(width,height)
{
    //Removes old board
    var game = document.getElementsByClassName("game");
    while(game[0].firstChild != null){
        game[0].removeChild(game[0].firstChild);
    }

    for(var row = 0; row < width * height; row++)
    {
        const rowElement = document.createElement("div");
        rowElement.className = "row";
        for(var column = 0; column < width * height; column++)
        {
            const inputElement = document.createElement("input");
            inputElement.className = "cell";
            inputElement.id = row * width * height + column;
            inputElement.type = "text";
            inputElement.maxLength = 1;

            inputElement.style.backgroundColor = "#ffffff";
            inputElement.style.color = "#000000";

            if(
                !(!((column - column % width) % (width * 2) == 0) ||
                !((row - row % height) % (height * 2) == 0))
                ||
                !(((column - column % width) % (width * 2) == 0) ||
                ((row - row % height) % (height * 2) == 0))
            )
            {
                inputElement.style.backgroundColor = "#d6d6d6";
            }

            rowElement.append(inputElement);
        }
        document.getElementsByClassName("game").item(0).appendChild(rowElement);
    }
}

generateNewBoard(0.5,'Normal');