function newBoard()
{
    var numbers = 
    [
        1,2,3,4,5,6,7,8,9,
        4,5,6,7,8,9,1,2,3,
        7,8,9,1,2,3,4,5,6,
        
        2,3,1,5,6,4,8,9,7,
        5,6,4,8,9,7,2,3,1,
        8,9,7,2,3,1,5,6,4,

        3,1,2,6,4,5,9,7,8,
        6,4,5,9,7,8,3,1,2,
        9,7,8,3,1,2,6,4,5,
    ];
    //Random acts to a solved board to shuffle it
    for(var i = 0; i < 25; i++)
    {
        var rand = Math.round(Math.random() * 11);
        switch(rand){
            case 0:
                numbers = RotateClockWise(numbers);
                break;
            case 1:
                numbers = RotateCounterClockWise(numbers);
                break;
            case 2:
                numbers = FlipHorizontal(numbers);
                break;
            case 3:
                numbers = FlipVertical(numbers);
                break;
            case 4:
                numbers = FlipDiagonal(numbers);
                break;
            case 5:
                numbers = FlipDiagonal2(numbers);
                break;
            case 6:
                randomNumber1 = Math.round(Math.random() * 8) + 1;
                randomNumber2 = Math.round(Math.random() * 8) + 1;
                SwapNumbers(numbers,randomNumber1,randomNumber2);
            case 7:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                randomNumber3 = Math.round(Math.random() * 2);
                SwapRows(numbers,randomNumber1 + 3 * randomNumber3,randomNumber2 + 3 * randomNumber3);
            case 8:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                SwapBands(numbers,randomNumber1,randomNumber2);
            case 9:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                randomNumber3 = Math.round(Math.random() * 2);
                SwapColumns(numbers,randomNumber1 + 3 * randomNumber3,randomNumber2 + 3 * randomNumber3);

            case 10:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                SwapStacks(numbers,randomNumber1,randomNumber2);
            case 11:
                break;
        }
    }

    //Removing numbers
    var emptyCount = 45;
    for(var i = 0; i < emptyCount; i++)
    {
        var index = Math.round(Math.random() * 80);
        while(numbers[index] == 0){
            index = Math.round(Math.random() * 80);
        }
        numbers[index] = 0;
    }

    setNumbers(numbers);
}

function setNumbers(table){
    //Putting numbers into the board
    for(var i = 0; i < table.length; i++){
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
    for (var i = 0; i < Math.pow(size, 2); i++)
    {
        for (var k = 0; k < Math.pow(size, 2); k++)
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
    var size = Math.sqrt(Math.sqrt(table.length));
    for (var i = 0; i < Math.pow(size,2); i++)
    {
        var holder = table[row1 * Math.pow(size,2) + i];
        table[row1 * Math.pow(size, 2) + i] = table[row2 * Math.pow(size, 2) + i];
        table[row2 * Math.pow(size, 2) + i] = holder;
    }
    return table;
}

function SwapBands(table, band1, band2)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for (var i = 0; i < size; i++)
    {
        table = SwapRows(table, band1 * size + i, band2 * size + i);
    }
    return table;
}

function SwapColumns(table, column1, column2)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for (var i = 0; i < Math.pow(size,2); i++)
    {
        var holder = table[i * Math.pow(size, 2) + column1];
        table[i * Math.pow(size, 2) + column1] = table[i * Math.pow(size, 2) + column2];
        table[i * Math.pow(size, 2) + column2] = holder;
    }
    return table;
}

function SwapStacks(table, stack1, stack2)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for(var i = 0; i < size; i++)
    {
        table = SwapColumns(table, stack1 * size + i, stack2 * size + i);
    }
    return table;
}

function CheckSudoku(table)
{
    var size = Math.sqrt(Math.sqrt(table.length));
    for(var row = 0; row < Math.pow(size,2); row++)
    {
        console.log("Checking row " + row);
        if(checkNumbers(table.slice(row*9,(row+1)*9)) == false)
        {
            console.log("Failed at row " + row)
            return false;
        }
    }
    
    for(var column = 0; column < Math.pow(size,2); column++)
    {
        var arr = [];
        for(var i = 0; i < Math.pow(size,2); i++)
        {
            arr.push(table[i*9 + column]);
        }
        console.log("Checking column " + column);
        if(checkNumbers(arr) == false)
        {
            console.log("Failed at column " + column)
            return false;
        }
    }

    for(var i = 0; i < size; i++)
    {
        for(var k = 0; k < size; k++)
        {
            var arr = [];
            index = i * size + k * Math.pow(size,3);
            for(var j = 0; j < size; j++){
                for(var l = 0; l < size; l++){
                    arr.push(table[index + j + l * Math.pow(size,2)]);
                }               
            }
            console.log("Checking cube at index " + index)
            if(checkNumbers(arr) == false){
                console.log("Failed cube at index " + index)
                return false;
            }
        }
    }
    return true;
}

function checkNumbers(numbers)
{

    console.log("Numbers before: " + numbers);
    if(numbers.length != 9)
    {
        console.log("Too few numbers");
        return false;
    }
    numbers.sort();
    console.log("Numbers sorted: " + numbers);
    correctArray = [1,2,3,4,5,6,7,8,9];
    for(var i = 0; i < numbers.length; i++)
    {
        if(numbers[i] != correctArray[i])
        {
            console.log("Numbers aren't correct");
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