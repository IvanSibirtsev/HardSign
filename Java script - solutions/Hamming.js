function code()
	{	
		let message = document.getElementById('mes').value;
		for(let i = 0; i < 4; i++) 
		{
            if (message[i] != 0 && message[i] != 1)
			{			
			    document.getElementById('error1').innerText = "Error";
                return;
            }
        }
		
		let p1 = parseInt(message[0]);
		let p2 = parseInt(message[1]);
		let p3 = parseInt(message[2]);
		let p4 = parseInt(message[3]);
		let result = ""; 
		if ((p1 + p2 + p4) % 2 === 1)
			result += '1';
		else 
			result += '0';
		if((p2 + p3 + p4) % 2 === 1)
			result += '1';
		else
			result += '0';
		if((p3 + p1 + p4) % 2 === 1)
			result += '1';
		else
			result += '0';
		document.getElementById('mes_cod').value = message + result;
	}
	
	function Improve(i)
	{
		document.getElementById('error2').innerText = '+Err on {i}';
            if (Number(message[i]) == 1) 
				Number(message[i]) = 0;
            else 
				Number(message[i]) = 1;
            document.getElementById('mes_decod').value = message.substr(0,4);
            return;
	}
	
	function GetNumber(message,i1,i2,i3,i4)
	{
		return Number(message[i1]) + Number(message[i2]) + Number(message[i3]) + Number(message[i4]);
	}
	
	function decode()
	{
		let message = document.getElementById('mes_cod').value;
		for(let i = 0; i < 7; i++) 
		{
            if (!(message[i] == 0 || message[i] == 1))
			{
                document.getElementById('error2').innerText = "ErrorRRRR";
                return;
			}
        }
		let p1 = GetNumber(message, 0, 1, 3, 4); 
		let p2 = GetNumber(message, 0, 2, 3, 6);
		let p3 = GetNumber(message, 1, 2, 3, 5);
		
		if (p1 % 2 === 0 && p2 % 2 === 0 && p3 % 2 === 0)
		{
            document.getElementById('error2').innerText = 'All is OKKK';
            document.getElementById('mes_decod').value = message.substr(0, 4);
            return;
        }
		else if (p1 % 2 != 0 && p2 % 2 != 0 && p3 % 2 === 0)
            Improve(0);
        else if (p1 % 2 != 0 && p2 % 2 === 0 && p3 % 2 != 0)  
			Improve(1);
        else if (p1 % 2 === 0 && p2 % 2 != 0 && p3 % 2 != 0)
			Improve(2);
        else if (p1 % 2 != 0 && p2 % 2 != 0 && p3 % 2 != 0)
			Improve(3);
        else if (p1 % 2 != 0)
			Improve(4);
        else if (p2 % 2 != 0)
			Improve(5);
        else if (p3 % 2 != 0)
			Improve(6);
        else
		{
            document.getElementById('error2').innerText = 'Errors more than 2';
            document.getElementById('mes_decod').value = message.substr(0,4);
            return;
		}
	}