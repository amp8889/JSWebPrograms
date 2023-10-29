
const billInput = document.getElementById('BillTextField');

const tipSlider = document.getElementById('tipSlider');


billInput.addEventListener('input', calculateTip);
tipSlider.addEventListener('input', calculateTip);



function calculateTip() {

    var tipPercentage = parseFloat(document.getElementById("tipSlider").value);
    var totalBill = parseFloat(document.getElementById("BillTextField").value);

    var tipAmount = totalBill * (tipPercentage/100);
    var billWithTip = (totalBill + tipAmount);

    var tipPercentageTextField = document.getElementById("tipPercentage")
    tipPercentageTextField.value = tipPercentage;

    var tipAmountTextField = document.getElementById("tipAmount");
    tipAmountTextField.value = tipAmount.toFixed(2)

    var totalBillWithTipTextField = document.getElementById("totalBillWithTip")
    totalBillWithTipTextField.value = billWithTip.toFixed(2)

    console.log(billWithTip)
    
}

