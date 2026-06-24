from app import app, db, User, Customer, AuditLog

with app.app_context():
    # Drop existing tables and recreate cleanly
    db.drop_all()
    db.create_all()
    print("Database infrastructure initialized inside vici_farm.db successfully.")

    # 1. Insert seed parameters for System Personnel Accounts
    staff_user = User(name="Isheja Wizy", email="ishejawizy@gmail.com", password="staff123", role="staff")
    admin_user = User(name="Emmanuel", email="emmanuel@viciltd.com", password="admin123", role="admin")
    db.session.add_all([staff_user, admin_user])

    # 2. Insert master reference clients
    c1 = Customer(name="Mugisha Patrick", phone="+250781234567", email="patrick.m@example.com", address="Gasabo, Kigali")
    c2 = Customer(name="Aline Uwineza", phone="+250739876543", email="-", address="Nyarugenge, Kigali")
    c3 = Customer(name="Hotel Kigali", phone="+250795551122", email="procurement@hotel.rw", address="Kicukiro, Kigali")
    db.session.add_all([c1, c2, c3])
    db.session.commit() # Flushes customers out to database disk to fetch primary keys safely

    # 3. Establish initial tracking metrics log
    log1 = AuditLog(staff="Isheja Wizy", action="Sale", detail="50kg Fresh Mushrooms", amount=100000, type="credit", status="valid", date="2026-06-18", time="14:30", customer_id=c1.id)
    log2 = AuditLog(staff="Isheja Wizy", action="Inventory", detail="Added 100kg Ipamba", amount=50000, type="debit", status="valid", date="2026-06-18", time="09:15")
    log3 = AuditLog(staff="Isheja Wizy", action="Sale", detail="10x Mushroom Tubes", amount=7000, type="credit", status="flagged_deleted", date="2026-06-17", time="16:45", customer_id=c2.id)
    log4 = AuditLog(staff="Isheja Wizy", action="Sale", detail="225x Mushroom Tubes", amount=157500, type="credit", status="valid", date="2026-06-10", time="10:00", customer_id=c3.id)
    
    db.session.add_all([log1, log2, log3, log4])
    db.session.commit()
    print("Pre-production test data values successfully injected into SQLite tables!")