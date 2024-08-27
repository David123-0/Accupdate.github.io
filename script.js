document.addEventListener("DOMContentLoaded", function () {
    // Add Inflow entry
    document.getElementById("addInflow").addEventListener("click", function () {
        let inflowSection = document.getElementById("inflowSection");
        let entry = document.createElement("div");
        entry.className = "entry";
        entry.innerHTML = `
            <input type="text" placeholder="Title of Inflow" class="title">
            <input type="number" placeholder="Amount in Naira" class="naira inflow">
            <input type="number" placeholder="Amount in Dollars" class="dollar inflow">
            <input type="date" class="date">
        `;
        inflowSection.appendChild(entry);
        updateTotals();
    });

    // Add Disbursement entry
    document.getElementById("addDisbursement").addEventListener("click", function () {
        let disbursementSection = document.getElementById("disbursementSection");
        let entry = document.createElement("div");
        entry.className = "entry";
        entry.innerHTML = `
            <input type="text" placeholder="Title of Disbursement" class="title">
            <input type="number" placeholder="Amount in Naira" class="naira disbursement">
            <input type="number" placeholder="Amount in Dollars" class="dollar disbursement">
            <input type="date" class="date">
        `;
        disbursementSection.appendChild(entry);
        updateTotals();
    });

    // Update totals
    function updateTotals() {
        let inflowNairaTotal = 0, inflowDollarTotal = 0;
        let disbursementNairaTotal = 0, disbursementDollarTotal = 0;

        document.querySelectorAll(".inflow.naira").forEach(input => {
            inflowNairaTotal += Number(input.value) || 0;
        });
        document.querySelectorAll(".inflow.dollar").forEach(input => {
            inflowDollarTotal += Number(input.value) || 0;
        });
        document.querySelectorAll(".disbursement.naira").forEach(input => {
            disbursementNairaTotal += Number(input.value) || 0;
        });
        document.querySelectorAll(".disbursement.dollar").forEach(input => {
            disbursementDollarTotal += Number(input.value) || 0;
        });

        document.getElementById("totalInflowNaira").textContent = inflowNairaTotal;
        document.getElementById("totalInflowDollar").textContent = inflowDollarTotal;
        document.getElementById("totalDisbursementNaira").textContent = disbursementNairaTotal;
        document.getElementById("totalDisbursementDollar").textContent = disbursementDollarTotal;

        let balanceForwardNaira = Number(document.getElementById("balanceForwardNaira").value) || 0;
        let balanceForwardDollar = Number(document.getElementById("balanceForwardDollar").value) || 0;

        let finalNaira = balanceForwardNaira + inflowNairaTotal - disbursementNairaTotal;
        let finalDollar = balanceForwardDollar + inflowDollarTotal - disbursementDollarTotal;

        document.getElementById("finalBalanceNaira").textContent = finalNaira;
        document.getElementById("finalBalanceDollar").textContent = finalDollar;
    }

    // Monitor changes in inputs
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", updateTotals);
    });

    // Save to PDF
    document.getElementById("saveToPDF").addEventListener("click", function () {
        const content = document.querySelector('.container');

        html2canvas(content, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = canvas.height * pdfWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            pdf.save('financial-update.pdf');
        });
    });
});
