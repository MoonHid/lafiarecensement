// Clé pour localStorage
const STORAGE_KEY = 'garage_vehicles';

// Charger les véhicules au démarrage
document.addEventListener('DOMContentLoaded', function() {
    loadVehicles();
});

// Ajouter ou modifier un véhicule
function addVehicle() {
    const vehicleId = document.getElementById('vehicle-id').value;
    const categorie = document.getElementById('categorie-select').value;
    const immat = document.getElementById('immat').value.trim();
    const marque = document.getElementById('marque').value.trim();
    const situation = document.querySelector('input[name="situation"]:checked')?.value;
    const observation = document.getElementById('observation').value.trim();
    const planning = document.querySelector('input[name="planning"]:checked')?.value;

    // Validation
    if (!immat || !marque || !situation || !categorie) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    const vehicles = getVehicles();

    // Cas de modification
    if (vehicleId) {
        const vehicleIndex = vehicles.findIndex(v => v.id === parseInt(vehicleId));
        if (vehicleIndex !== -1) {
            vehicles[vehicleIndex] = {
                ...vehicles[vehicleIndex],
                categorie,
                immat,
                marque,
                situation,
                observation,
                planning
            };
            saveVehicles(vehicles);
            alert('Véhicule modifié avec succès !');
            cancelEdit();
            renderVehicles();
            scrollToVehicles();
        }
        return;
    }

    // Cas d'ajout
    if (vehicles.some(v => v.immat.toUpperCase() === immat.toUpperCase())) {
        alert('Ce véhicule existe déjà!');
        return;
    }

    // Créer le nouvel objet véhicule
    const vehicle = {
        id: Date.now(),
        categorie,
        immat,
        marque,
        situation,
        observation,
        planning
    };

    // Ajouter à la liste
    vehicles.push(vehicle);
    saveVehicles(vehicles);

    // Réinitialiser le formulaire
    resetForm();

    // Recharger le tableau
    renderVehicles();

    // Afficher un message de succès
    scrollToVehicles();
}

// Éditer un véhicule
function editVehicle(id) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) return;

    // Remplir le formulaire avec les données du véhicule
    document.getElementById('vehicle-id').value = vehicle.id;
    document.getElementById('categorie-select').value = vehicle.categorie || 'Ligne 1';
    document.getElementById('immat').value = vehicle.immat;
    document.getElementById('marque').value = vehicle.marque;
    document.getElementById('observation').value = vehicle.observation;

    // Cocher les radio buttons appropriés
    document.querySelectorAll('input[name="situation"]').forEach(input => {
        input.checked = input.value === vehicle.situation;
    });
    document.querySelectorAll('input[name="planning"]').forEach(input => {
        input.checked = input.value === vehicle.planning;
    });

    // Changer le titre et les boutons
    document.getElementById('form-title').textContent = '✏️ Modifier un véhicule';
    document.getElementById('submit-btn').textContent = 'Enregistrer les modifications';
    document.getElementById('cancel-btn').style.display = 'block';

    // Scroll vers le formulaire
    scrollToForm();
}

// Annuler la modification
function cancelEdit() {
    document.getElementById('vehicle-id').value = '';
    resetForm();
    document.getElementById('form-title').textContent = 'Ajouter un véhicule';
    document.getElementById('submit-btn').textContent = 'Ajouter le véhicule';
    document.getElementById('cancel-btn').style.display = 'none';
}

// Supprimer un véhicule
function deleteVehicle(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
        let vehicles = getVehicles();
        vehicles = vehicles.filter(v => v.id !== id);
        saveVehicles(vehicles);
        renderVehicles();
    }
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('vehicle-id').value = '';
    document.getElementById('categorie-select').value = 'Ligne 1';
    document.getElementById('immat').value = '';
    document.getElementById('marque').value = '';
    document.getElementById('observation').value = '';
    document.querySelectorAll('input[name="situation"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="planning"]').forEach(input => input.checked = false);
    document.getElementById('immat').focus();
}

// Récupérer les véhicules du localStorage
function getVehicles() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Sauvegarder les véhicules
function saveVehicles(vehicles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    updateStats();
}

// Charger et afficher les véhicules
function loadVehicles() {
    renderVehicles();
}

// Afficher les véhicules dans le tableau
function renderVehicles() {
    const vehicles = getVehicles();
    const tableBody = document.getElementById('table-body');

    if (vehicles.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <p>Aucun véhicule actuellement. Ajoutez votre premier véhicule !</p>
                </td>
            </tr>
        `;
        updateStats();
        return;
    }

    // Grouper les véhicules par catégorie
    const categories = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5'];
    let html = '';
    categories.forEach((cat, idx) => {
        // Ajoute un espace avant chaque catégorie sauf la première
        if (idx > 0) {
            html += `<tr><td colspan="6" style="height:18px;background:transparent;"></td></tr>`;
        }
        const catVehicles = vehicles.filter(v => (v.categorie || 'Ligne 1') === cat);
        html += `<tr><td colspan="6" style="background:#e0e7ff;font-weight:bold;font-size:15px;">${cat}</td></tr>`;
        if (catVehicles.length > 0) {
            html += catVehicles.map(vehicle => `
                <tr>
                    <td><strong>${vehicle.immat}</strong></td>
                    <td>${vehicle.marque}</td>
                    <td><span class="situation ${getSituationClass(vehicle.situation)}">${vehicle.situation}</span></td>
                    <td>${vehicle.observation || '-'}</td>
                    <td><span class="planning ${getPlanningClass(vehicle.planning)}">${vehicle.planning}</span></td>
                    <td>
                        <button class="btn btn-primary btn-small" onclick="editVehicle(${vehicle.id})">Modifier</button>
                        <button class="btn btn-danger btn-small" onclick="deleteVehicle(${vehicle.id})">Supprimer</button>
                    </td>
                </tr>
            `).join('');
        } else {
            html += `<tr><td colspan="6" style="text-align:center;color:#888;font-style:italic;">Aucun véhicule dans cette catégorie</td></tr>`;
        }
    });
    tableBody.innerHTML = html;
    updateStats();
}

// Déterminer la classe CSS pour la situation
function getSituationClass(situation) {
    const classMap = {
        'Diagnostique': 'diagnostique',
        'En attente pièce': 'attente-piece',
        'En attente planif': 'attente-planif',
        'Recherche pièce': 'recherche-piece'
    };
    return classMap[situation] || '';
}

// Déterminer la classe CSS pour le planning
function getPlanningClass(planning) {
    return planning === 'Déjà planifié' ? 'planifie' : 'planifier';
}

// Exporter en PDF
function exportToPDF() {
    const vehicles = getVehicles();
    const categories = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5'];
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Garage_Inventaire_${new Date().toLocaleDateString('fr-FR')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true, logging: false },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        pagebreak: { mode: 'css' }
    };

    // Créer un conteneur temporaire
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'width:190mm; padding:0; margin:0; font-family:Arial,sans-serif; font-size:12px;';

    tempDiv.innerHTML = `<h1 style="text-align:center; margin:0 0 16px 0; font-size:18px; color:#333;">Inventaire Garage - ${new Date().toLocaleDateString('fr-FR')}</h1>`;

    categories.forEach(cat => {
        const catVehicles = vehicles.filter(v => (v.categorie || 'Ligne 1') === cat);
        if (catVehicles.length > 0) {
            const section = document.createElement('div');
            section.style.cssText = 'margin-bottom:14px; page-break-inside: avoid;';

            // Titre de catégorie
            const catTitle = document.createElement('div');
            catTitle.textContent = cat;
            catTitle.style.cssText = 'background:#e0e7ff; padding:6px 10px; font-size:13px; font-weight:bold; color:#333; margin-bottom:0;';
            section.appendChild(catTitle);

            // Tableau pour la catégorie
            const table = document.createElement('table');
            table.style.cssText = 'width:100%; border-collapse:collapse; table-layout:fixed;';
            table.innerHTML = `
                <thead>
                    <tr style="background:#667eea; color:white;">
                        <th style="padding:6px 8px; text-align:left; border:1px solid #5a6fd6; width:18%;">P. Immat</th>
                        <th style="padding:6px 8px; text-align:left; border:1px solid #5a6fd6; width:22%;">Marque/Couleur</th>
                        <th style="padding:6px 8px; text-align:left; border:1px solid #5a6fd6; width:18%;">Situation</th>
                        <th style="padding:6px 8px; text-align:left; border:1px solid #5a6fd6; width:28%;">Observation</th>
                        <th style="padding:6px 8px; text-align:left; border:1px solid #5a6fd6; width:14%;">Planning</th>
                    </tr>
                </thead>
                <tbody>
                    ${catVehicles.map((vehicle, i) => `
                        <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f8f9ff'};">
                            <td style="padding:5px 8px; border:1px solid #ddd; font-weight:bold;">${vehicle.immat}</td>
                            <td style="padding:5px 8px; border:1px solid #ddd;">${vehicle.marque}</td>
                            <td style="padding:5px 8px; border:1px solid #ddd;">${vehicle.situation}</td>
                            <td style="padding:5px 8px; border:1px solid #ddd;">${vehicle.observation || '-'}</td>
                            <td style="padding:5px 8px; border:1px solid #ddd;">${vehicle.planning || '-'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            section.appendChild(table);
            tempDiv.appendChild(section);
        }
    });

    html2pdf().set(opt).from(tempDiv).save();
}

// Exporter les données en JSON (caché sous le PDF)
function exportToJSON() {
    const vehicles = getVehicles();
    const dataStr = JSON.stringify(vehicles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Garage_Sauvegarde_${new Date().toLocaleDateString('fr-FR')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Importer depuis JSON
function importFromJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            let data;

            // Essayer de parser comme JSON d'abord
            try {
                data = JSON.parse(content);
                if (Array.isArray(data)) {
                    if (confirm('Cela ajoutera ' + data.length + ' véhicule(s). Continuer ?')) {
                        let vehicles = getVehicles();
                        vehicles = vehicles.concat(data);
                        saveVehicles(vehicles);
                        renderVehicles();
                        alert('Données importées avec succès !');
                    }
                    event.target.value = '';
                    return;
                }
            } catch (e) {
                // N'est pas du JSON valide
            }

                alert('Format non supporté. Veuillez utiliser un fichier JSON exporté depuis l\'application.');
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            alert('Erreur lors de l\'import du fichier');
        }
    };

    reader.readAsText(file);
}

// Effacer toutes les données
function clearAllData() {
    if (confirm('Êtes-vous absolument sûr ? Cette action ne peut pas être annulée !')) {
        if (confirm('Dernière confirmation : supprimer TOUS les véhicules ?')) {
            localStorage.removeItem(STORAGE_KEY);
            renderVehicles();
            alert('Toutes les données ont été supprimées');
        }
    }
}

// Mettre à jour les statistiques
function updateStats() {
    const vehicles = getVehicles();
    
    document.getElementById('total-vehicles').textContent = vehicles.length;
    
    const diagnostique = vehicles.filter(v => v.situation === 'Diagnostique').length;
    document.getElementById('total-diagnostique').textContent = diagnostique;
    
    const attente = vehicles.filter(v => 
        v.situation === 'En attente pièce' || v.situation === 'En attente planif'
    ).length;
    document.getElementById('total-attente').textContent = attente;
}

// Scroll vers le formulaire
function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('immat').focus();
}

// Scroll vers les véhicules
function scrollToVehicles() {
    document.getElementById('vehicles-table').scrollIntoView({ behavior: 'smooth' });
}

// Bonus: Permet d'ajouter un véhicule avec Entrée
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('planning-planifier').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addVehicle();
        }
    });
});

// Changer le lien d'import pour JSON au lieu de PDF
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('json-import');
    if (fileInput) fileInput.accept = '.json';
    
    // Rendre accessible via console pour avancés
    window.exportJSON = exportToJSON;
});

// ================================================================
//                   FICHES ATELIER
// ================================================================

const STORAGE_KEY_FICHES = 'garage_fiches_atelier';

// ---------- Tabs ----------
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(function(el) {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(function(el) {
        el.classList.remove('active');
    });
    var panel = document.getElementById('tab-' + tabName);
    var btn   = document.getElementById('tab-btn-' + tabName);
    if (panel) { panel.classList.add('active'); panel.style.display = 'block'; }
    if (btn)   { btn.classList.add('active'); }
    if (tabName === 'fiches') renderFiches();
}

// ---------- Signature canvas ----------
var signatureCanvas, signatureCtx, isDrawing = false;

document.addEventListener('DOMContentLoaded', function() {
    // Set default date on fiche form
    var dateInput = document.getElementById('fiche-date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Init signature canvas
    signatureCanvas = document.getElementById('signature-canvas');
    if (!signatureCanvas) return;
    signatureCtx = signatureCanvas.getContext('2d');
    signatureCtx.strokeStyle = '#1a1a2e';
    signatureCtx.lineWidth = 2;
    signatureCtx.lineCap = 'round';
    signatureCtx.lineJoin = 'round';

    signatureCanvas.addEventListener('mousedown',  startDraw);
    signatureCanvas.addEventListener('mousemove',  draw);
    signatureCanvas.addEventListener('mouseup',    stopDraw);
    signatureCanvas.addEventListener('mouseleave', stopDraw);
    signatureCanvas.addEventListener('touchstart', startDrawTouch, { passive: false });
    signatureCanvas.addEventListener('touchmove',  drawTouch,      { passive: false });
    signatureCanvas.addEventListener('touchend',   stopDraw);

    renderFiches();
});

function getCanvasPos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width  / rect.width;
    var scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}

function startDraw(e) {
    isDrawing = true;
    var pos = getCanvasPos(signatureCanvas, e);
    signatureCtx.beginPath();
    signatureCtx.moveTo(pos.x, pos.y);
}

function draw(e) {
    if (!isDrawing) return;
    var pos = getCanvasPos(signatureCanvas, e);
    signatureCtx.lineTo(pos.x, pos.y);
    signatureCtx.stroke();
}

function stopDraw() { isDrawing = false; }

function startDrawTouch(e) {
    e.preventDefault();
    startDraw({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
}

function drawTouch(e) {
    e.preventDefault();
    draw({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
}

function clearSignature() {
    if (signatureCtx) signatureCtx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
}

function isSignatureEmpty() {
    if (!signatureCanvas) return true;
    var px = signatureCtx.getImageData(0, 0, signatureCanvas.width, signatureCanvas.height).data;
    for (var i = 3; i < px.length; i += 4) { if (px[i] > 0) return false; }
    return true;
}

// ---------- CRUD ----------
function getFiches() {
    var data = localStorage.getItem(STORAGE_KEY_FICHES);
    return data ? JSON.parse(data) : [];
}

function saveFiches(fiches) {
    localStorage.setItem(STORAGE_KEY_FICHES, JSON.stringify(fiches));
}

function addFiche() {
    var ficheId  = document.getElementById('fiche-id').value;
    var categorie = document.getElementById('fiche-categorie').value;
    var marque   = document.getElementById('fiche-marque').value.trim();
    var immat    = document.getElementById('fiche-immat').value.trim();
    var km       = document.getElementById('fiche-km').value.trim();
    var client   = document.getElementById('fiche-client').value.trim();
    var date     = document.getElementById('fiche-date').value;
    var travaux  = document.getElementById('fiche-travaux').value.trim();
    var obs      = document.getElementById('fiche-obs').value.trim();
    var signature = isSignatureEmpty() ? '' : signatureCanvas.toDataURL('image/png');

    if (!marque || !immat || !client) {
        alert('Veuillez remplir les champs obligatoires : Marque/Modèle, Immatriculation, Nom du client (*)');
        return;
    }

    var fiches = getFiches();

    if (ficheId) {
        var idx = fiches.findIndex(function(f) { return f.id === parseInt(ficheId); });
        if (idx !== -1) {
            fiches[idx] = Object.assign(fiches[idx], { categorie, marque, immat, km, client, date, travaux, obs, signature });
            saveFiches(fiches);
            alert('Fiche modifiée avec succès !');
            cancelFicheEdit();
            renderFiches();
        }
        return;
    }

    fiches.push({ id: Date.now(), categorie, marque, immat, km, client, date, travaux, obs, signature });
    saveFiches(fiches);
    resetFicheForm();
    renderFiches();
    document.getElementById('fiches-table').scrollIntoView({ behavior: 'smooth' });
}

function editFiche(id) {
    var fiches = getFiches();
    var f = fiches.find(function(f) { return f.id === id; });
    if (!f) return;

    document.getElementById('fiche-id').value          = f.id;
    document.getElementById('fiche-categorie').value   = f.categorie || 'Ligne 1';
    document.getElementById('fiche-marque').value      = f.marque;
    document.getElementById('fiche-immat').value       = f.immat;
    document.getElementById('fiche-km').value          = f.km || '';
    document.getElementById('fiche-client').value      = f.client;
    document.getElementById('fiche-date').value        = f.date || '';
    document.getElementById('fiche-travaux').value     = f.travaux || '';
    document.getElementById('fiche-obs').value         = f.obs || '';

    clearSignature();
    if (f.signature) {
        var img = new Image();
        img.onload = function() { signatureCtx.drawImage(img, 0, 0); };
        img.src = f.signature;
    }

    document.getElementById('fiche-form-title').textContent        = '✏️ Modifier la Fiche Atelier';
    document.getElementById('fiche-submit-btn').textContent        = 'Enregistrer les modifications';
    document.getElementById('fiche-cancel-btn').style.display      = 'block';
    document.getElementById('fiche-form-section').scrollIntoView({ behavior: 'smooth' });
}

function deleteFiche(id) {
    if (confirm('Supprimer cette fiche atelier ?')) {
        var fiches = getFiches().filter(function(f) { return f.id !== id; });
        saveFiches(fiches);
        renderFiches();
    }
}

function cancelFicheEdit() {
    document.getElementById('fiche-id').value = '';
    resetFicheForm();
    document.getElementById('fiche-form-title').textContent   = '📝 Nouvelle Fiche Atelier';
    document.getElementById('fiche-submit-btn').textContent   = 'Enregistrer la fiche';
    document.getElementById('fiche-cancel-btn').style.display = 'none';
}

function resetFicheForm() {
    ['fiche-id','fiche-marque','fiche-immat','fiche-km','fiche-client','fiche-travaux','fiche-obs'].forEach(function(id) {
        document.getElementById(id).value = '';
    });
    document.getElementById('fiche-categorie').value = 'Ligne 1';
    document.getElementById('fiche-date').value = new Date().toISOString().split('T')[0];
    clearSignature();
}

// ---------- Render ----------
function renderFiches() {
    var tableBody = document.getElementById('fiches-table-body');
    if (!tableBody) return;
    var fiches = getFiches();
    var categories = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5'];
    var html = '';

    if (fiches.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="empty-state"><div class="empty-state-icon">🔧</div><p>Aucune fiche atelier. Créez votre première fiche !</p></td></tr>';
        return;
    }

    categories.forEach(function(cat, idx) {
        if (idx > 0) html += '<tr><td colspan="6" style="height:18px;background:transparent;"></td></tr>';
        var catFiches = fiches.filter(function(f) { return (f.categorie || 'Ligne 1') === cat; });
        html += '<tr><td colspan="6" style="background:#e0e7ff;font-weight:bold;font-size:15px;">' + cat + '</td></tr>';
        if (catFiches.length > 0) {
            html += catFiches.map(function(f) {
                var dateDisp = f.date ? new Date(f.date + 'T00:00:00').toLocaleDateString('fr-FR') : '-';
                var travauxPrev = (f.travaux || '-').replace(/"/g, '&quot;');
                var travauxShort = travauxPrev.length > 60 ? travauxPrev.substring(0, 57) + '…' : travauxPrev;
                return '<tr>' +
                    '<td><strong>' + f.immat + '</strong></td>' +
                    '<td>' + f.marque + '</td>' +
                    '<td>' + f.client + '</td>' +
                    '<td>' + dateDisp + '</td>' +
                    '<td style="max-width:200px;" title="' + travauxPrev + '">' + travauxShort + '</td>' +
                    '<td>' +
                        '<button class="btn btn-success btn-small" onclick="printFiche(' + f.id + ')">🖨️ PDF</button> ' +
                        '<button class="btn btn-primary btn-small" onclick="editFiche(' + f.id + ')">Modifier</button> ' +
                        '<button class="btn btn-danger btn-small" onclick="deleteFiche(' + f.id + ')">Supprimer</button>' +
                    '</td></tr>';
            }).join('');
        } else {
            html += '<tr><td colspan="6" style="text-align:center;color:#888;font-style:italic;">Aucune fiche dans cette catégorie</td></tr>';
        }
    });
    tableBody.innerHTML = html;
}

// ---------- PDF fiche unique ----------
function buildFicheHTML(f) {
    var dateStr = f.date ? new Date(f.date + 'T00:00:00').toLocaleDateString('fr-FR') : '';

    function buildLines(text, minRows) {
        var lines = (text || '').split('\n');
        while (lines.length < minRows) lines.push('');
        return lines.map(function(l) {
            return '<div class="line">' + (l.trim().length ? l : '&nbsp;') + '</div>';
        }).join('');
    }

    function infoRow(label, value) {
        return '<tr>'
            + '<td class="info-label">' + label + '</td>'
            + '<td class="info-value">' + (value || '') + '</td>'
            + '</tr>';
    }

    var sigImg = f.signature
        ? '<img src="' + f.signature + '" style="max-height:124px;max-width:332px;display:block;">'
        : '';

    return '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">'
        + '<title>Fiche Atelier – ' + f.immat + '</title>'
        + '<style>'
        + '@page { size: A4 portrait; margin: 8mm 10mm; }'
        + '* { box-sizing: border-box; margin: 0; padding: 0; }'
        + 'body { font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #111; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
        + '.page { width: 100%; }'

        /* Header */
        + '.header { background: #1a3a6b; color: white; padding: 26px 30px; display: flex; justify-content: space-between; align-items: center; border-radius: 5px 5px 0 0; }'
        + '.header-left .brand { font-size: 28px; font-weight: 900; letter-spacing: 3px; }'
        + '.header-left .sub { font-size: 14px; color: #a8c8ff; margin-top: 5px; letter-spacing: 1px; }'
        + '.header-right { text-align: right; }'
        + '.header-right .title { font-size: 22px; font-weight: 700; letter-spacing: 2px; }'
        + '.header-right .num { font-size: 13px; color: #a8c8ff; margin-top: 5px; }'

        /* Info box */
        + '.info-box { background: #eef3fb; border-left: 6px solid #1a3a6b; padding: 16px 22px; margin: 20px 0; }'
        + '.info-box-title { font-size: 12px; font-weight: 700; color: #1a3a6b; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }'
        + 'table.info { width: 100%; border-collapse: collapse; }'
        + 'td.info-label { width: 36%; font-weight: 700; font-size: 15px; padding: 8px 0; color: #1a3a6b; vertical-align: middle; }'
        + 'td.info-value { font-size: 15px; padding: 8px 10px; vertical-align: middle; border-bottom: 1.5px solid #7aa6d6; }'

        /* Section headings */
        + '.section-title { font-size: 12px; font-weight: 700; color: #1a3a6b; letter-spacing: 2px; text-transform: uppercase; border-bottom: 2.5px solid #1a3a6b; padding-bottom: 5px; margin-bottom: 4px; margin-top: 20px; }'

        /* Lines */
        + '.line { border-bottom: 1px solid #9bbcdb; min-height: 34px; padding: 3px 8px; font-size: 15px; line-height: 30px; }'

        /* Signature */
        + '.sig-section { margin-top: 24px; }'
        + '.sig-box { border: 1.5px solid #7aa6d6; border-radius: 4px; height: 130px; width: 340px; background: #fafcff; display: flex; align-items: center; justify-content: center; }'

        /* Footer */
        + '.footer { background: #1a3a6b; color: #a8c8ff; font-size: 12px; text-align: center; padding: 11px 0; margin-top: 24px; border-radius: 0 0 5px 5px; }'

        + '@media print {'
        + '  body { margin: 0; }'
        + '  .no-print { display: none; }'
        + '}'
        + '</style></head><body>'

        + '<div class="page">'

        + '<div class="header">'
        +   '<div class="header-left"><div class="brand">LAFIA MOBILE</div><div class="sub">Service Atelier</div></div>'
        +   '<div class="header-right"><div class="title">FICHE ATELIER</div><div class="num">N° ' + f.id + '</div></div>'
        + '</div>'

        + '<div class="info-box">'
        +   '<div class="info-box-title">Informations véhicule &amp; client</div>'
        +   '<table class="info">'
        +     infoRow('Marque / Modèle :', f.marque)
        +     infoRow('Immatriculation :', f.immat)
        +     infoRow('Kilométrage :', f.km || '')
        +     infoRow('Nom du client :', f.client)
        +     infoRow('Date :', dateStr)
        +   '</table>'
        + '</div>'

        + '<div class="section-title">Travaux demandés</div>'
        + buildLines(f.travaux, 8)

        + '<div class="section-title">Observations du technicien</div>'
        + buildLines(f.obs, 8)

        + '<div class="sig-section">'
        +   '<div class="section-title">Signature du technicien</div>'
        +   '<div class="sig-box">' + sigImg + '</div>'
        + '</div>'

        + '<div class="footer">LAFIA MOBILE &mdash; Fiche générée le ' + new Date().toLocaleDateString('fr-FR') + '</div>'

        + '</div>'
        + '<script>window.onload=function(){window.print();}<\/script>'
        + '</body></html>';
}

function printFiche(id) {
    var f = getFiches().find(function(f) { return f.id === id; });
    if (!f) return;
    var win = window.open('', '_blank');
    if (!win) { alert('Veuillez autoriser les popups pour imprimer la fiche.'); return; }
    win.document.open();
    win.document.write(buildFicheHTML(f));
    win.document.close();
}

// ---------- Export/Import JSON fiches ----------
function exportFichesToPDF() {
    var fiches = getFiches();
    if (fiches.length === 0) { alert('Aucune fiche à exporter.'); return; }

    function infoRow(label, value) {
        return '<tr><td class="info-label">' + label + '</td><td class="info-value">' + (value || '') + '</td></tr>';
    }

    var pagesHTML = fiches.map(function(f, i) {
        var dStr = f.date ? new Date(f.date + 'T00:00:00').toLocaleDateString('fr-FR') : '';
        var sigImg = f.signature ? '<img src="' + f.signature + '" style="max-height:124px;max-width:332px;display:block;">' : '';
        var linesT = (f.travaux || '').split('\n');
        while (linesT.length < 8) linesT.push('');
        var linesO = (f.obs || '').split('\n');
        while (linesO.length < 8) linesO.push('');
        var tHTML = linesT.map(function(l){ return '<div class="line">' + (l.trim().length ? l : '&nbsp;') + '</div>'; }).join('');
        var oHTML = linesO.map(function(l){ return '<div class="line">' + (l.trim().length ? l : '&nbsp;') + '</div>'; }).join('');
        return '<div class="page' + (i > 0 ? ' page-break' : '') + '">'
            + '<div class="header"><div class="header-left"><div class="brand">LAFIA MOBILE</div><div class="sub">Service Atelier</div></div><div class="header-right"><div class="title">FICHE ATELIER</div><div class="num">N° ' + f.id + '</div></div></div>'
            + '<div class="info-box"><div class="info-box-title">Informations véhicule &amp; client</div><table class="info">'
            + infoRow('Marque / Modèle :', f.marque) + infoRow('Immatriculation :', f.immat) + infoRow('Kilométrage :', f.km || '') + infoRow('Nom du client :', f.client) + infoRow('Date :', dStr)
            + '</table></div>'
            + '<div class="section-title">Travaux demandés</div>' + tHTML
            + '<div class="section-title">Observations du technicien</div>' + oHTML
            + '<div class="sig-section"><div class="section-title">Signature du technicien</div><div class="sig-box">' + sigImg + '</div></div>'
            + '<div class="footer">LAFIA MOBILE &mdash; Fiche générée le ' + new Date().toLocaleDateString('fr-FR') + '</div>'
            + '</div>';
    }).join('');

    var fullHTML = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Fiches Atelier</title>'
        + '<style>'
        + '@page{size:A4 portrait;margin:8mm 10mm;}'
        + '*{box-sizing:border-box;margin:0;padding:0;}'
        + 'body{font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111;background:white;-webkit-print-color-adjust:exact;print-color-adjust:exact;}'
        + '.page-break{page-break-before:always;}'
        + '.header{background:#1a3a6b;color:white;padding:26px 30px;display:flex;justify-content:space-between;align-items:center;border-radius:5px 5px 0 0;}'
        + '.header-left .brand{font-size:28px;font-weight:900;letter-spacing:3px;}'
        + '.header-left .sub{font-size:14px;color:#a8c8ff;margin-top:5px;letter-spacing:1px;}'
        + '.header-right{text-align:right;}'
        + '.header-right .title{font-size:22px;font-weight:700;letter-spacing:2px;}'
        + '.header-right .num{font-size:13px;color:#a8c8ff;margin-top:5px;}'
        + '.info-box{background:#eef3fb;border-left:6px solid #1a3a6b;padding:16px 22px;margin:20px 0;}'
        + '.info-box-title{font-size:12px;font-weight:700;color:#1a3a6b;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}'
        + 'table.info{width:100%;border-collapse:collapse;}'
        + 'td.info-label{width:36%;font-weight:700;font-size:15px;padding:8px 0;color:#1a3a6b;vertical-align:middle;}'
        + 'td.info-value{font-size:15px;padding:8px 10px;vertical-align:middle;border-bottom:1.5px solid #7aa6d6;}'
        + '.section-title{font-size:12px;font-weight:700;color:#1a3a6b;letter-spacing:2px;text-transform:uppercase;border-bottom:2.5px solid #1a3a6b;padding-bottom:5px;margin-bottom:4px;margin-top:20px;}'
        + '.line{border-bottom:1px solid #9bbcdb;min-height:34px;padding:3px 8px;font-size:15px;line-height:30px;}'
        + '.sig-section{margin-top:24px;}'
        + '.sig-box{border:1.5px solid #7aa6d6;border-radius:4px;height:130px;width:340px;background:#fafcff;display:flex;align-items:center;justify-content:center;}'
        + '.footer{background:#1a3a6b;color:#a8c8ff;font-size:12px;text-align:center;padding:11px 0;margin-top:24px;border-radius:0 0 5px 5px;}'
        + '</style></head><body>'
        + pagesHTML
        + '<script>window.onload=function(){window.print();}<\/script>'
        + '</body></html>';

    var win = window.open('', '_blank');
    if (!win) { alert('Veuillez autoriser les popups pour imprimer les fiches.'); return; }
    win.document.open();
    win.document.write(fullHTML);
    win.document.close();
}

function exportFichesJSON() {
    var data = JSON.stringify(getFiches(), null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url;
    a.download = 'Fiches_Atelier_' + new Date().toLocaleDateString('fr-FR').replace(/\//g, '-') + '.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importFichesJSON(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        try {
            var data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                if (confirm('Importer ' + data.length + ' fiche(s) ? Elles s\'ajouteront aux fiches existantes.')) {
                    saveFiches(getFiches().concat(data));
                    renderFiches();
                    alert('Fiches importées avec succès !');
                }
            } else { alert('Format JSON invalide.'); }
            event.target.value = '';
        } catch(err) { alert('Erreur lors de la lecture du fichier JSON.'); }
    };
    reader.readAsText(file);
}

function clearAllFiches() {
    if (confirm('Êtes-vous sûr de vouloir supprimer TOUTES les fiches atelier ?')) {
        if (confirm('Dernière confirmation : supprimer toutes les fiches ?')) {
            localStorage.removeItem(STORAGE_KEY_FICHES);
            renderFiches();
            alert('Toutes les fiches ont été supprimées.');
        }
    }
}

