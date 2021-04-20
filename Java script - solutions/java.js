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
	
	function decode()
	{
		let bites = new Array();
		let message = document.getElementById('mes_cod').value;
		let result = "";
		for(let i = 0; i < 7; i++) 
		{
            if (!(message[i] === 0 || message[i] === 1))
                document.getElementById('error').innerText = "ErrorRRRR";
                return;
            
        }
		
		let p1 = Number(message[0]) + Number(message[1]) + Number(message[3]) + Number(message[4]); 
		let p2 = Number(message[1]) + Number(message[2]) + Number(message[3]) + Number(message[5]);
		let p3 = Number(message[2]) + Number(message[3]) + Number(message[0]) + Number(message[6]);
		
		if (p1 % 2 === 0 && p2 % 2 === 0 && p3 % 2 === 0)
		{
            document.getElementById('error').innerText = 'All is OKKK';
            document.getElementById('mes_decod').value = message.subst(0, 3);
            return;
        }
        if (p1 % 2 != 0 && p2 % 2 != 0 && p3 % 2 === 0){
            document.getElementById('error').innerText = 'ErrorROR';
            if (Number(message[0]) == 1) 
				Number(message[0]) = 0;
            else 
				Number(message[0]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        if (p1 % 2 != 0 && p2 % 2 === 0 && p3 % 2 != 0){
            document.getElementById('error').innerText = 'ErrorRAR';
            if (Number(message[1]) == 1)
				Number(message[1]) = 0;
            else
				Number(message[1]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        if (p1 % 2 === 0 && p2 % 2 != 0 && p3 % 2 != 0){
            document.getElementById('error').innerText = 'ErrorRAP';
            if (Number(message[2]) == 1) 
				Number(message[2]) = 0;
            else 
				Number(message[2]) = 1;
            document.getElementById('mes_decod').value = message(0,3);
            return;
        }
        if (p1 % 2 != 0 && p2 % 2 != 0 && p3 % 2 != 0){
            document.getElementById('error').innerText = 'ErrorRAUL';
            if (Number(message[3] == 1)) 
				Number(message[3]) = 0;
            else 
				Number(message[3]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        if (p1 % 2 != 0){
            document.getElementById('error').innerText = 'Error was';
            if (Number(message[4]) == 1) 
				Number(message[4]) = 0;
            else 
				Number(message[4]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        if (p2 % 2 != 0){
            document.getElementById('error').innerText = 'Error was';
            if (Number(message[5]) == 1) 
				Number(message[5]) = 0;
            else 
				Number(message[5]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        if (p3 % 2 != 0){
            document.getElementById('error').innerText = 'Error was';
            if (Number(message[6]) == 1)
				Number(message[6]) = 0;
            else 
				Number(message[6]) = 1;
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
        }
        else
		{
            document.getElementById('error').innerText = 'Errors more than 2totototoooooooooooooooooooo';
            document.getElementById('mes_decod').value = message.subst(0,3);
            return;
		}
	}
	