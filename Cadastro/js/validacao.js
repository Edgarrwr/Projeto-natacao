const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isAllValid = true;

    const fields = [
        {
            id: 'name',
            label: 'Nome',
            validator: nameIsValid,
        },
        {
            id: 'last_name',
            label: 'Ultimo nome',
            validator: nameIsValid,
        },
        {
            id: 'birthdate',
            label: 'Nascimento',
            validator: dateIsValid,
        },
        {
            id: 'email',
            label: 'e-mail',
            validator: emailIsValid,
        },
        {
            id: 'cpf',
            label: 'Cpf',
            validator: cpfIsValid,
        },
        {
            id: 'contato',
            label: 'cotato',
            validator: contatoIsValid,
        },
    ]

    const erroIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input-box');
        const inputValue = input.value;

        const errorSpan = inputBox.querySelector('.error');
        errorSpan.innerHTML = '';

        inputBox.classList.remove('invalid')
        inputBox.classList.add('valid')

        const fieldValidator = field.validator(inputValue);
        console.log(field.id)
        console.log(fieldValidator)

        if (!fieldValidator.isValid) {
            errorSpan.innerHTML = `${erroIcon} ${fieldValidator.erroMessage}`;
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
            isAllValid = false;
            return;          
        }else{
            inputBox.classList.remove('invalid');
            inputBox.classList.add('valid');
        }

    })

    if(isAllValid){
        window.alert("Parabens! cadastro concluido!")
        fields.forEach(function (field) {
            const input = document.getElementById(field.id);
            const inputBox = input.closest('.input-box');
    
            inputBox.classList.remove('invalid')
            inputBox.classList.remove('valid')
            
            input.value = "";
    
        })
    }


})


function isEmpty(value) {

    return value === '';
}

function nameIsValid(value) {
    const validator = {
        isValid: true,
        erroMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O campo é obrigatorio';
        return validator;
    }
    const min = 3;

    if (value.length < min) {
        validator.isValid = false;
        validator.erroMessage = `o campo deve ter o mínimo ${min} caracteres.`;
        return validator;
    }

    const regex = /^[a-zA-Z]/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O campo só pode conter letras';
    }

    return validator;
}

function dateIsValid(value) {
    const validator = {
        isValid: true,
        erroMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O nascimento é obrigatorio';
        return validator;
    }

    const year = new Date(value).getFullYear();

    if (year < 1920 || year > new Date().getFullYear()) {
        validator.isValid = false;
        validator.erroMessage = 'Data invalida';
    }
    return validator;
}

function emailIsValid(value) {
    const validator = {
        isValid: true,
        erroMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O e-mail é obrigatorio';
        return validator;
    }

    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O e-mail precisa ser valido';
        return validator;
    }

    return validator;
}

function cpfIsValid(value) {
    const validator = {
        isValid: true,
        erroMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O cpf é obrigatorio';
        return validator;
    }

    // const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    // if (!regex.test(value)) {
    //     validator.isValid = false;
    //     validator.erroMessage = 'O campo só pode conter numeros';
    // }
    return validator;
}


function contatoIsValid(value) {
    const validator = {
        isValid: true,
        erroMessage: null
    };

    if (isEmpty(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O telefone para contato é obrigatorio';
        return validator;
    }

    const regex = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.erroMessage = 'O campo só pode conter numeros';
    }
    return validator;
}

