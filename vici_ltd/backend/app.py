import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Eliminates the browser portfolio block completely!

# Set up SQLite instance file right inside the backend directory
db_path = os.path.join(os.path.dirname(__file__), 'vici_farm.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# =========================================================================
# 🏗️ SQLALCHEMY DATABASE TABLES SCHEMA
# =========================================================================

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False) # Plain text for simplicity(may be encrypted later)
    role = db.Column(db.String(20), nullable=False)  # 'admin' or 'staff'
    status = db.Column(db.String(20), default='Active')

class Customer(db.Model):
    __tablename__ = 'customers'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(100), default='-')
    address = db.Column(db.String(200), nullable=False)
    
    # Relationship to automatically tally lifetime transaction values
    sales = db.relationship('AuditLog', backref='customer_rel', lazy=True)

class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    id = db.Column(db.Integer, primary_key=True)
    staff = db.Column(db.String(100), nullable=False)
    action = db.Column(db.String(50), nullable=False)     # 'Sale' or 'Inventory'
    detail = db.Column(db.String(200), nullable=False)     # e.g., '50kg Fresh Mushrooms'
    amount = db.Column(db.Integer, nullable=False)          # Currency numbers in RWF
    type = db.Column(db.String(20), nullable=False)         # 'credit' (sales) or 'debit' (materials)
    status = db.Column(db.String(30), default='valid')     # 'valid', 'flagged_deleted', 'approved_deleted'
    date = db.Column(db.String(30), nullable=False)         # Stored format matching frontend picker: YYYY-MM-DD
    time = db.Column(db.String(20), nullable=False)         # Stored format: HH:MM
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=True)

# =========================================================================
# 📡 CONNECTIVITY ROUTES & API ENDPOINTS
# =========================================================================

# 1. AUTHENTICATION: ViciStaffLogin.jsx Path
@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({
            "success": True,
            "role": user.role,
            "name": user.name
        }), 200
    
    return jsonify({
        "success": False,
        "message": "Invalid email or password configuration."
    }), 401


# 2. PASSWORD RECOVERY: ForgotPassword.jsx Path
@app.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json() or {}
    email = data.get('email')
    
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({
            "success": True,
            "message": "A password reset link has been successfully dispatched to your email address."
        }), 200
    
    return jsonify({
        "success": False,
        "message": "This email address is not registered in our system. Please try again."
    }), 404


# 3. OPERATION LOGGER: StaffDashboard.jsx POST Methods
@app.route('/api/operations', methods=['POST'])
def add_operation():
    data = request.get_json() or {}
    op_type = data.get('type')  # 'Sale' or 'Inventory'
    log_date = data.get('date', datetime.today().strftime('%Y-%m-%d'))
    log_time = datetime.now().strftime('%H:%M')
    
    if op_type == 'Sale':
        sales_info = data.get('salesData', {})
        customer_info = data.get('customerData', {})
        
        # Ensure customer identity is mapped out cleanly
        c_name = customer_info.get('name', '').strip() or 'Walk-in Customer'
        customer = Customer.query.filter_by(name=c_name).first()
        if not customer:
            customer = Customer(
                name=c_name,
                phone=customer_info.get('phone', '-'),
                email=customer_info.get('email', '-'),
                address=customer_info.get('address', 'Walk-in')
            )
            db.session.add(customer)
            db.session.commit()
            
        quantity = float(sales_info.get('quantity', 0))
        unit_price = float(sales_info.get('unitPrice', 0))
        calculated_amount = int(quantity * unit_price)
        
        new_log = AuditLog(
            staff=data.get('staff_name', 'Isheja Wizy'),
            action='Sale',
            detail=f"{quantity}x {sales_info.get('product')} @ {unit_price:,} RWF",
            amount=calculated_amount,
            type='credit',
            status='valid',
            date=log_date,
            time=log_time,
            customer_id=customer.id
        )
        db.session.add(new_log)
        db.session.commit()
        return jsonify({"success": True, "message": "Sale recorded successfully!"}), 201

    elif op_type == 'Inventory':
        inv_info = data.get('inventoryData', {})
        action = inv_info.get('action') # 'use' or 'add'
        qty = inv_info.get('quantity', 0)
        item = inv_info.get('item')
        
        cost_value = int(inv_info.get('cost')) if inv_info.get('cost') else 0
        detail_txt = f"{'Used' if action == 'use' else 'Added'} {qty} {item}"
        
        new_log = AuditLog(
            staff=data.get('staff_name', 'Isheja Wizy'),
            action='Inventory',
            detail=detail_txt,
            amount=cost_value,
            type='debit' if action == 'add' else 'neutral',
            status='valid',
            date=log_date,
            time=log_time
        )
        db.session.add(new_log)
        db.session.commit()
        return jsonify({"success": True, "message": "Inventory tracking updated successfully!"}), 201

    return jsonify({"success": False, "message": "Invalid operations payload format."}), 400


    # 🚀 1. GET ROUTE: Fetches all operations logs from SQLite database
@app.route('/api/operations', methods=['GET'])
def get_operations():
    try:
        # Fetch all logs, ordering by ID descending (newest entries first!)
        logs_query = AuditLog.query.order_by(AuditLog.id.desc()).all()
        
        formatted_logs = []
        for log in logs_query:
            # Resolve customer name Safely using the database relationship
            customer_name = "-"
            if log.customer_id and log.customer_rel:
                customer_name = log.customer_rel.name
            elif log.action == 'Sale':
                customer_name = "Walk-in Customer"

            # Format the transaction monetary value string exactly how your React UI expects it
            if log.action == 'Sale':
                display_amount = f"{log.amount:,} RWF"
            else:  # Inventory Outflow
                display_amount = f"Cost: {log.amount:,} RWF" if log.amount > 0 else "-"

            formatted_logs.append({
                "id": log.id,
                "type": log.action,          # 'Sale' or 'Inventory'
                "detail": log.detail,
                "customer": customer_name,
                "amount": display_amount,
                "date": log.date,
                "time": log.time
            })
            
        return jsonify({
            "success": True,
            "logs": formatted_logs
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "message": f"Database query error: {str(e)}"
        }), 500




# 4. MASTER ENGINE PACKS: AdminDashboard.jsx Aggregations & Audit Rails
@app.route('/api/admin/metrics', methods=['GET'])
def get_admin_metrics():
    # Pull master components directly from live table calculations
    all_logs = AuditLog.query.all()
    all_users = User.query.all()
    all_customers = Customer.query.all()
    
    logs_payload = []
    for log in all_logs:
        c_name = log.customer_rel.name if log.customer_rel else "-"
        logs_payload.append({
            "id": log.id,
            "staff": log.staff,
            "action": log.action,
            "customer": c_name,
            "detail": log.detail,
            "amount": log.amount,
            "type": log.type,
            "status": log.status,
            "date": log.date,
            "time": log.time
        })
        
    users_payload = [{
        "id": u.id, "name": u.name, "email": u.email, "role": u.role, "status": u.status
    } for u in all_users]
    
    customers_payload = []
    for c in all_customers:
        # Loop through connected sales metrics to formulate lifetime values dynamically
        ltv = sum([sale.amount for sale in c.sales if sale.status == 'valid'])
        last_order = max([sale.date for sale in c.sales]) if c.sales else "None"
        customers_payload.append({
            "id": c.id,
            "name": c.name,
            "phone": c.phone,
            "email": c.email,
            "address": c.address,
            "lifetimeValue": ltv,
            "lastPurchase": last_order
        })

    return jsonify({
        "auditLogs": logs_payload,
        "personnel": users_payload,
        "customers": customers_payload
    }), 200


# 5. CONFLICT MANAGEMENT: Soft Deletes Approvals & Rejections
@app.route('/api/admin/resolve-log/<int:log_id>', methods=['PATCH'])
def resolve_log(log_id):
    data = request.get_json() or {}
    approve = data.get('approve', False)
    
    target_log = AuditLog.query.get_or_404(log_id)
    if approve:
        target_log.status = 'approved_deleted'
        target_log.amount = 0  # Resets the financial implication on the live revenue aggregation chart
    else:
        target_log.status = 'valid'
        
    db.session.commit()
    return jsonify({"success": True, "message": f"Log resolve complete. Action: {approve}"}), 200


# 6. SOFT DELETE REQUEST: Triggered by Staff
@app.route('/api/operations/flag-delete/<int:log_id>', methods=['PATCH'])
def flag_delete_log(log_id):
    target_log = AuditLog.query.get_or_404(log_id)
    target_log.status = 'flagged_deleted'
    db.session.commit()
    return jsonify({"success": True, "message": "Entry flagged for admin review."}), 200


if __name__ == '__main__':
    app.run(port=5000, debug=True)