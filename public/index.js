document.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('.table tbody tr');
    rows.forEach(row => {
        const columns = row.getElementsByTagName('td');
        console.log(`Title: ${columns[0].textContent}`);
        console.log(`Department: ${columns[2].textContent}`);

    });
});
