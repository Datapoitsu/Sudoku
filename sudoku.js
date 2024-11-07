// -------------------- Sudoku -------------------- //
//Written by: Aarni Junkkala
var width = 0;
var height = 0;


function newBoard(boardWidth, boardHeight, dissappearanceRate)
{
    width = boardWidth
    height = boardHeight;
    var numbers = [];
    holder = [];
    for(var i = 0; i < width * height; i++)
    {
        holder.push(i + 1);
    }
    for(var h = 0; h < width * height; h++)
    {
        for(var w = 0; w < holder.length; w++)
        {
            numbers.push(holder[w]);
        }

        //Shifting numbers within row.
        var holder2 = holder.slice(0,width);

        for(var w = 0; w < width; w++)
        {
            holder.shift();
        }
        holder = holder.concat(holder2);
        
        if(h % height == 0)
        {
            var holder3 = [];
            for(var w = 0; w < height; w++)
            {
                holder3 = holder.slice(w*width,(w+1)*width);
                holder4 = holder3[0];
                holder3.shift();
                holder3.push(holder4);
                for(var i = 0; i < holder3.length; i++)
                {
                    holder[w*width + i] = holder3[i];
                }
            }
        }
    }
    shuffleBoard(numbers);
    removeNumbers(numbers,dissappearanceRate);
    setNumbers(numbers);
}

function shuffleBoard(table){
    //Random acts to a solved board to shuffle it
    //Acts that don't make sense to repeat many times
    let rand = 0;
    if(width == height) //These moves only work with boards that have same width and height
    {
        rand = Math.round(Math.random() * 3)
        for(var i = 0; i < rand; i++)
        {
            table = RotateClockWise(table);
        }
        rand = Math.round(Math.random() * 1)
        if(rand == 0)
        {
            table = FlipDiagonal(table);
        }
        rand = Math.round(Math.random() * 1)
        if(rand == 0)
        {
            table = FlipDiagonal2(table);
        }
    }

    let randomNumber1, randomNumber2, randomNumber3;

    //Repeatable acts
    for(var i = 0; i < table.length; i++)
    {
        rand = Math.round(Math.random() * 5);
        switch(rand){
            case 0:
                randomNumber1 = Math.round(Math.random() * (Math.sqrt(table.length) - 1)) + 1;
                randomNumber2 = Math.round(Math.random() * (Math.sqrt(table.length) - 1)) + 1;
                SwapNumbers(table, randomNumber1, randomNumber2);
                break;
            case 1:
                randomNumber3 = height * Math.round(Math.random() * (width - 1));
                randomNumber1 = Math.round(Math.random() * (height - 1));
                randomNumber2 = randomNumber1;
                while(randomNumber1 == randomNumber2){
                    randomNumber2 = Math.round(Math.random() * (height - 1));
                }
                randomNumber1 += randomNumber3;
                randomNumber2 += randomNumber3;
                SwapRows(table, randomNumber1, randomNumber2);
                break;
            case 2:
                randomNumber1 = Math.round(Math.random() * (width - 1));
                randomNumber2 = randomNumber1;
                while(randomNumber1 == randomNumber2)
                {
                    randomNumber2 = Math.round(Math.random() * (width - 1));
                }
                SwapBands(table, randomNumber1, randomNumber2);
                break;
            case 3:
                randomNumber3 = width * Math.round(Math.random() * (height - 1));
                randomNumber1 = Math.round(Math.random() * (width - 1));
                randomNumber2 = randomNumber1;
                while(randomNumber1 == randomNumber2){
                    randomNumber2 = Math.round(Math.random() * (width - 1));
                }
                randomNumber1 += randomNumber3;
                randomNumber2 += randomNumber3;
                SwapColumns(table, randomNumber1, randomNumber2);
                break;
            case 4:
                randomNumber1 = Math.round(Math.random() * (height - 1));
                randomNumber2 = randomNumber1;
                while(randomNumber1 == randomNumber2)
                {
                    randomNumber2 = Math.round(Math.random() * (height - 1));
                }
                SwapStacks(table, randomNumber1, randomNumber2);
                break;
            case 5:
                break;
        }
    }
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

function RotateClockWise(table)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    var copy = table.slice();
    for (let i = 0; i < Math.pow(size, 2); i++)
    {
        for (let k = 0; k < Math.pow(size, 2); k++)
        {
            table[i * Math.pow(size, 2) + k] = copy[(Math.pow(size, 2) - 1 - k) * Math.pow(size, 2) + i];
        }
    }
    return table;
}

function RotateCounterClockWise(table)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    var copy = table.slice();
    for(var i = 0; i < Math.pow(size,2); i++)
    {
        for(var k = 0; k < Math.pow(size, 2); k++)
        {
            table[i * Math.pow(size, 2) + k] = copy[(k + 1) * Math.pow(size, 2) - i - 1];
        }
    }
    return table;
}

function FlipHorizontal(table)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for (var i = 0; i < Math.pow(size,2); i++)
    {
        for(var k = 0; k < Math.floor(Math.pow(size, 2) / 2); k++)
        {
            var holder = table[i * Math.pow(size,2) + k];
            table[i * Math.pow(size, 2) + k] = table[i * Math.pow(size, 2) + Math.pow(size, 2) - 1 - k];
            table[i * Math.pow(size, 2) + Math.pow(size, 2) - 1 - k] = holder;
        }
    }
    return table;
}

function FlipVertical(table)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for (var h = 0; h < Math.pow(size,2); h++)
    {
        for(var v = 0; v < Math.floor(Math.pow(size, 2) / 2); v++)
        {
            var holder = table[v * Math.pow(size, 2) + h];
            table[v * Math.pow(size, 2) + h] = table[(Math.pow(size, 2) - 1 - v) * Math.pow(size, 2) + h];
            table[(Math.pow(size, 2) - 1 - v) * Math.pow(size, 2) + h] = holder;
        }
    }
    return table;
}

function FlipDiagonal(table) //From NW to SE
{
    var size = Math.sqrt(Math.sqrt(table.length));
    var copy = Array(table.length).fill(-1);
    for (var r = 0; r < Math.pow(size,2); r++)
    {
        for (var c = 0; c < Math.pow(size, 2); c++)
        {
            copy[r * Math.pow(size, 2) + c] = table[c * Math.pow(size, 2) + r];
        }
    }
    return copy;
}

function FlipDiagonal2(table) //From SW, NE
{
    var size = Math.sqrt(Math.sqrt(table.length));
    var copy = table.slice();
    for (var r = 0; r < Math.pow(size, 2); r++)
    {
        for (var c = 0; c < Math.pow(size, 2); c++)
        {
            copy[r * Math.pow(size, 2) + c] = table[(Math.pow(size,2) - 1 - c) * Math.pow(size,2) + Math.pow(size,2) - 1 - r];
        }
    }    
    return copy;
}

function SwapNumbers(table, num1, num2)
{
    for(var i = 0; i < table.length; i++)
    {
        if (table[i] == num1)
        {
            table[i] = num2;
        }
        else if (table[i] == num2)
        {
            table[i] = num1;
        }
    }
    return table;
}

function SwapRows(table, row1, row2)
{
    var size = Math.sqrt(table.length);
    for(let i = 0; i < size; i++)
    {
        let holder = table[row1 * size + i];
        table[row1 * size + i] = table[row2 * size + i];
        table[row2 * size + i] = holder;
    }
    return table;
}

function SwapBands(table, band1, band2)
{
    for (var i = 0; i < height; i++)
    {
        table = SwapRows(table, band1 * height + i, band2 * height + i);
    }
    return table;
}

function SwapColumns(table, column1, column2)
{
    var size = Math.sqrt(table.length);
    for(let i = 0; i < size; i++)
    {
        let holder = table[column1 + i * size];
        table[column1 + i * size] = table[column2 + i * size];
        table[column2 + i * size] = holder;
    }
    return table;
}

function SwapStacks(table, stack1, stack2)
{
    for(var i = 0; i < width; i++)
    {
        table = SwapColumns(table, stack1 * width + i, stack2 * width + i);
    }
    return table;
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
    if(width == '' || width < 2){
        width = 2;
    }
    if(height == '' || height < 2){
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