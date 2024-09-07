document.getElementById("calculate").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents form from submitting

    // Get values from form
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseFloat(document.getElementById('loanTenure').value);
    const prepaymentAmount = parseFloat(document.getElementById('prepaymentAmount').value) || 0;

    // Validate inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTenure)) {
        alert("Please enter valid values!");
        return;
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;

    // Total number of months
    const numberOfPayments = loanTenure * 12;

    // EMI formula: E = P * r * (1 + r)^n / [(1 + r)^n – 1]
    const emi = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Total payment and total interest
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    // Update UI
    document.getElementById("monthlyEmi").innerText = emi.toFixed(2);
    document.getElementById("totalPayment").innerText = totalPayment.toFixed(2);
    document.getElementById("totalInterest").innerText = totalInterest.toFixed(2);

    // Optional: Update the chart
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        data: [
            {
                type: "pie",
                indexLabel: "{label}: {y}%",
                dataPoints: [
                    { label: "Principal Amount", y: (loanAmount / totalPayment) * 100 },
                    { label: "Total Interest", y: (totalInterest / totalPayment) * 100 },
                ],
            },
        ],
    });
    chart.render();
});
