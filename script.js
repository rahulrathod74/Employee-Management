const departmentFilter = document.getElementById('departmentFilter');
const genderFilter = document.getElementById('genderFilter');
const salarySort = document.getElementById('salarySort');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const employeeTable = document.getElementById('employeeTable');
const pagination = document.getElementById('pagination');

let currentPage = 1;
const limit = 10;
let totalEmployees = 0;

function fetchData() {
    const url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${currentPage}&limit=${limit}&filterBy=${departmentFilter.value ? 'department' : ''}&filterValue=${departmentFilter.value || genderFilter.value}&sort=${salarySort.value ? 'salary' : ''}&order=${salarySort.value}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalEmployees = data.total;
            renderEmployees(data.data);
            updatePagination();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderEmployees(employees) {
    let html = `<table>
                    <tr>
                        <th>S.no</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                    </tr>`;
    
    employees.forEach((employee, index) => {
        html += `<tr>
                    <td>${index + 1}</td>
                    <td>${employee.name}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.department}</td>
                    <td>${employee.salary}</td>
                </tr>`;
    });
    
    html += `</table>`;
    
    employeeTable.innerHTML = html;
}

function updatePagination() {
    const totalPages = Math.ceil(totalEmployees / limit);
    if (currentPage === 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (currentPage === totalPages) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage++;
        fetchData();
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(totalEmployees / limit);
    if (currentPage < totalPages) {
        currentPage++;
        fetchData();
    }
});

departmentFilter.addEventListener('change', fetchData);
genderFilter.addEventListener('change', fetchData);
salarySort.addEventListener('change', fetchData);

// Initial fetch
fetchData();
