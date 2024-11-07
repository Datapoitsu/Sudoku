// -------------------- Sudoku -------------------- //
//Written by: Aarni Junkkala

function newBoard(width, height, dissappearanceRate)
{
    var numbers = [];
    holder = [];
    //console.log("Width",width,"Height",height);
    for(var i = 0; i < width * height; i++)
    {
        holder.push(i + 1);
    }
    //console.log("holder: " + holder)
    //console.log("Numbers: " + numbers);
    for(var h = 0; h < width * height; h++)
    {
        //console.log("Holder at start..." + holder);
        for(var w = 0; w < holder.length; w++)
        {
            numbers.push(holder[w]);
        }
        //console.log("Numbers: " + numbers + " Length: " + numbers.length);

        //Shifting numbers within row.
        var holder2 = holder.slice(0,width);
        //console.log("Holder2: " + holder2);

        for(var w = 0; w < width; w++)
        {
            holder.shift();
        }
        //console.log("Cutted holder " + holder);
        holder = holder.concat(holder2);
        //console.log("Holder: " + holder);
        
        if(h % height == 0)
        {
            var holder3 = [];
            for(var w = 0; w < height; w++)
            {
                holder3 = holder.slice(w*width,(w+1)*width);
                holder4 = holder3[0];
                holder3.shift();
                holder3.push(holder4);
                //console.log("Holder here: " + holder);
                for(var i = 0; i < holder3.length; i++)
                {
                    holder[w*width + i] = holder3[i];
                }
                //console.log("Holder here too: " + holder);
            }
        }
    }

    //console.log("Numbers ", numbers);
    //shuffleBoard(numbers);
    //removeNumbers(numbers,dissappearanceRate);
    setNumbers(numbers);
}

function shuffleBoard(table){
    //Random acts to a solved board to shuffle it

    //Acts that don't make sense to repeat many times
    var rand = Math.round(Math.random() * 3)
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

    //Repeatable acts
    for(var i = 0; i < 500; i++)
    {
        rand = Math.round(Math.random() * 5);
        switch(rand){
            case 0:
                randomNumber1 = Math.round(Math.random() * 8) + 1;
                randomNumber2 = Math.round(Math.random() * 8) + 1;
                SwapNumbers(table,randomNumber1,randomNumber2);
            case 1:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                randomNumber3 = Math.round(Math.random() * 2);
                SwapRows(table,randomNumber1 + 3 * randomNumber3,randomNumber2 + 3 * randomNumber3);
            case 2:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                SwapBands(table,randomNumber1,randomNumber2);
            case 3:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                randomNumber3 = Math.round(Math.random() * 2);
                SwapColumns(table,randomNumber1 + 3 * randomNumber3,randomNumber2 + 3 * randomNumber3);
            case 4:
                randomNumber1 = Math.round(Math.random() * 2);
                randomNumber2 = Math.round(Math.random() * 2);
                SwapStacks(table,randomNumber1,randomNumber2);
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
    
    //Check rows.
    for(var row = 0; row < Math.pow(size,2); row++)
    {
        if(checkNumbers(table.slice(row*Math.pow(size,2),(row+1)*Math.pow(size)),size) == false)
        {
            return false;
        }
    }
    
    //Check columns.
    for(var column = 0; column < Math.pow(size,2); column++)
    {
        var arr = [];
        for(var i = 0; i < Math.pow(size,2); i++)
        {
            arr.push(table[i*Math.pow(size,2) + column]);
        }
        if(checkNumbers(arr,size) == false)
        {
            return false;
        }
    }

    //Check squares.
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
            if(checkNumbers(arr,size) == false){
                return false;
            }
        }
    }
    return true;
}

function checkNumbers(numbers,size)
{
    if(numbers.length != size*size)
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
    //console.log("Printing sudoku");
    for(var i = 0; i < Math.pow(size,2);i++){
        //console.log(table.slice(i*Math.pow(size,2),(i+1)*Math.pow(size,2)))
    }
}