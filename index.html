<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestion Garage - Inventaire Véhicules</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://pdftron.com/downloads/pl/webviewer-demo-annotated.pdf"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            padding: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 30px;
            text-align: center;
        }

        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-success {
            background: #48bb78;
            color: white;
        }

        .btn-success:hover {
            background: #38a169;
            transform: translateY(-2px);
        }

        .btn-danger {
            background: #f56565;
            color: white;
        }

        .btn-danger:hover {
            background: #e53e3e;
        }

        .btn-secondary {
            background: #718096;
            color: white;
        }

        .btn-secondary:hover {
            background: #4a5568;
        }

        .form-section {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
        }

        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 15px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
        }

        label {
            font-weight: 600;
            margin-bottom: 5px;
            color: #2d3748;
            font-size: 13px;
        }

        input[type="text"],
        select,
        textarea {
            padding: 10px;
            border: 1px solid #cbd5e0;
            border-radius: 5px;
            font-size: 14px;
            font-family: inherit;
        }

        input[type="text"]:focus,
        select:focus,
        textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 80px;
        }

        .checkbox-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        input[type="checkbox"],
        input[type="radio"] {
            cursor: pointer;
            width: 16px;
            height: 16px;
        }

        .radio-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .radio-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        input[type="file"] {
            padding: 8px;
        }

        .table-section {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        thead {
            background: #667eea;
            color: white;
        }

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
            font-size: 13px;
        }

        td {
            padding: 12px 15px;
            border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:hover {
            background: #f7fafc;
        }

        tbody tr:nth-child(even) {
            background: #f9fafb;
        }

        .btn-small {
            padding: 6px 12px;
            font-size: 12px;
            border-radius: 4px;
        }

        .situation {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 600;
        }

        .situation.diagnostique {
            background: #fef3c7;
            color: #92400e;
        }

        .situation.attente-piece {
            background: #fee2e2;
            color: #991b1b;
        }

        .situation.attente-planif {
            background: #dbeafe;
            color: #1e40af;
        }

        .situation.recherche-piece {
            background: #e9d5ff;
            color: #581c87;
        }

        .planning {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 600;
        }

        .planning.planifier {
            background: #fed7aa;
            color: #92400e;
        }

        .planning.planifie {
            background: #dcfce7;
            color: #166534;
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #718096;
        }

        .empty-state-icon {
            font-size: 48px;
            margin-bottom: 10px;
        }

        #pdf-import {
            display: none;
        }

        .hidden-print {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }

            .container {
                box-shadow: none;
                padding: 0;
            }

            .controls,
            .form-section {
                display: none;
            }

            .table-section {
                overflow-x: visible;
            }

            table {
                page-break-inside: avoid;
            }

            thead {
                display: table-header-group;
            }

            tbody tr {
                page-break-inside: avoid;
            }
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .stat-card h3 {
            font-size: 24px;
            margin-bottom: 5px;
        }

        .stat-card p {
            font-size: 12px;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔧 Gestion Garage - Inventaire Véhicules</h1>

        <div class="stats">
            <div class="stat-card">
                <h3 id="total-vehicles">0</h3>
                <p>Véhicules total</p>
            </div>
            <div class="stat-card">
                <h3 id="total-diagnostique">0</h3>
                <p>En diagnostic</p>
            </div>
            <div class="stat-card">
                <h3 id="total-attente">0</h3>
                <p>En attente</p>
            </div>
        </div>

        <div class="controls">
            <button class="btn btn-primary" onclick="scrollToForm()">➕ Ajouter un Véhicule</button>
            <button class="btn btn-success" onclick="exportToPDF()">📥 Exporter en PDF</button>
            <button class="btn btn-info" onclick="exportToJSON()">💾 Exporter en JSON</button>
            <button class="btn btn-secondary" onclick="document.getElementById('json-import').click()">📤 Importer JSON</button>
            <button class="btn btn-danger" onclick="clearAllData()">🗑️ Tout Effacer</button>
            <input type="file" id="json-import" accept=".json" onchange="importFromJSON(event)">
        </div>

        <div class="form-section" id="form-section">
            <label for="categorie-select" style="font-weight:bold;margin-bottom:5px;display:block;">Catégorie</label>
            <select id="categorie-select" style="margin-bottom:15px;width:200px;">
                <option value="Ligne 1">Ligne 1</option>
                <option value="Ligne 2">Ligne 2</option>
                <option value="Ligne 3">Ligne 3</option>
                <option value="Ligne 4">Ligne 4</option>
                <option value="Ligne 5">Ligne 5</option>
            </select>
            <h2 id="form-title">Ajouter un véhicule</h2>
            <input type="hidden" id="vehicle-id">
            <div class="form-row">
                <div class="form-group">
                    <label for="immat">P. Immatriculation *</label>
                    <input type="text" id="immat" placeholder="Ex: AB-123-CD" required>
                </div>
                <div class="form-group">
                    <label for="marque">Marque/Couleur *</label>
                    <input type="text" id="marque" placeholder="Ex: Peugeot 207 Noir" required>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Situation *</label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" id="situation-diagnostic" name="situation" value="Diagnostique" required>
                            <label for="situation-diagnostic">Diagnostique</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="situation-attente-piece" name="situation" value="En attente pièce">
                            <label for="situation-attente-piece">En attente pièce</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="situation-attente-planif" name="situation" value="En attente planif">
                            <label for="situation-attente-planif">En attente planif</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="situation-recherche" name="situation" value="Recherche pièce">
                            <label for="situation-recherche">Recherche pièce</label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="observation">Observation</label>
                    <textarea id="observation" placeholder="Notez les détails importants..."></textarea>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Planning *</label>
                    <div class="radio-group">
                        <div class="radio-item">
                            <input type="radio" id="planning-planifier" name="planning" value="Planifier">
                            <label for="planning-planifier">À Planifier</label>
                        </div>
                        <div class="radio-item">
                            <input type="radio" id="planning-planifie" name="planning" value="Déjà planifié">
                            <label for="planning-planifie">Déjà planifié</label>
                        </div>
                    </div>
                </div>
            </div>

            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="submit-btn" onclick="addVehicle()">Ajouter le véhicule</button>
                <button class="btn btn-secondary" id="cancel-btn" onclick="cancelEdit()" style="display: none;">Annuler</button>
            </div>
        </div>

        <div class="table-section">
            <table id="vehicles-table">
                <thead>
                    <tr>
                        <th>P. Immat</th>
                        <th>Marque/Couleur</th>
                        <th>Situation</th>
                        <th>Observation</th>
                        <th>Planning</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr>
                        <td colspan="6" class="empty-state">
                            <div class="empty-state-icon">📋</div>
                            <p>Aucun véhicule actuellement. Ajoutez votre premier véhicule !</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
