let isAdmin = false;

let defaultStaff = [
    {
        name: "Coach David Mwangi",
        role: "Head Technical Director & Head Coach",
        desc: "Over 12 years of youth development experience holding advanced coaching certifications.",
        img: "badge.png"
    },
    {
        name: "Coach Sarah Ochieng",
        role: "Goalkeeping & Youth Academy Coach",
        desc: "Former national league goalkeeper specializing in reflexes, distribution, and mental conditioning.",
        img: "badge.png"
    }
];

let staffList = JSON.parse(localStorage.getItem('psa_staff')) || defaultStaff;

function saveStaff() {
    localStorage.setItem('psa_staff', JSON.stringify(staffList));
}

function renderStaff() {
    const container = document.getElementById('staffContainer');
    if (!container) return;
    container.innerHTML = '';
    
    staffList.forEach((staff, index) => {
        container.innerHTML += `
            <div class="staff-card" id="staff-${index}">
                <div class="staff-img-container">
                    <img src="${staff.img}" alt="Staff Photo" id="staffImg-${index}">
                </div>
                <div style="flex-grow: 1;">
                    <div class="admin-only-control" style="margin-bottom: 4px;">
                        <input type="text" value="${staff.img}" placeholder="Photo Image URL" onchange="updateStaffData(${index}, 'img', this.value)" style="font-size:0.75rem; padding:4px; margin-bottom:4px; width:100%; background:#0f172a; color:#fff; border:1px solid #475569; border-radius:4px;">
                    </div>
                    <strong style="color: var(--primary);" class="editable" contenteditable="${isAdmin}" onblur="updateStaffData(${index}, 'name', this.innerText)">${staff.name}</strong>
                    <div style="font-size:0.85rem; color: var(--text-light);" class="editable" contenteditable="${isAdmin}" onblur="updateStaffData(${index}, 'role', this.innerText)">${staff.role}</div>
                    <p class="editable" contenteditable="${isAdmin}" onblur="updateStaffData(${index}, 'desc', this.innerText)" style="margin: 4px 0 0 0; font-size:0.85rem;">${staff.desc}</p>
                    
                    <button class="btn-danger admin-only-control" onclick="removeStaff(${index})">Remove Leader</button>
                </div>
            </div>
        `;
    });
}

function updateStaffData(index, field, value) {
    staffList[index][field] = value ? value : (field === 'img' ? 'badge.png' : '');
    saveStaff();
    if(field === 'img') renderStaff();
}

function addStaffMember() {
    staffList.push({
        name: "New Leader / Coach Name",
        role: "Title / Position",
        desc: "Short bio or description goes here...",
        img: "badge.png"
    });
    saveStaff();
    renderStaff();
}

function removeStaff(index) {
    if(confirm("Are you sure you want to remove this staff member?")) {
        staffList.splice(index, 1);
        saveStaff();
        renderStaff();
    }
}

function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    btn.classList.add('active');
}

function toggleAdminMode() {
    isAdmin = !isAdmin;
    const body = document.getElementById('appBody');
    const btn = document.getElementById('adminToggleBtn');
    const editables = document.querySelectorAll('.editable');

    if (isAdmin) {
        body.classList.add('admin-mode');
        btn.innerText = "Exit Admin";
        btn.style.background = "#ef4444";
        btn.style.color = "#fff";
        editables.forEach(el => el.setAttribute('contenteditable', 'true'));
    } else {
        body.classList.remove('admin-mode');
        btn.innerText = "Admin";
        btn.style.background = "transparent";
        btn.style.color = "var(--primary)";
        editables.forEach(el => el.setAttribute('contenteditable', 'false'));
    }
    renderStaff();
}

function openRegister() {
    document.querySelectorAll('.tab-btn')[6].click();
}

renderStaff();
