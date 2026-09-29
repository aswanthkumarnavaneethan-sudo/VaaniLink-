import os
from flask import Flask, render_template, jsonify, request
from database import init_db, get_db_connection
from translation_service import translate_text

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "default-secret-key-for-dev")

init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health_check():
    return jsonify({
        "status": "ok",
        "application": "VaaniLink"
    })

@app.route('/api/messages', methods=['GET', 'POST'])
def manage_messages():
    if request.method == 'POST':
        data = request.json
        original_message = data.get('message')
        source_language = data.get('source_language')
        target_language = data.get('target_language')
        
        translated_message = translate_text(original_message, target_language)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO messages (sender_id, receiver_id, original_message, translated_message, source_language, target_language)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', ('sender1', 'receiver1', original_message, translated_message, source_language, target_language))
        conn.commit()
        conn.close()
        
        return jsonify({"status": "success", "translated_message": translated_message}), 201

    else:
        conn = get_db_connection()
        messages = conn.execute('SELECT * FROM messages ORDER BY timestamp DESC').fetchall()
        conn.close()
        
        messages_list = [dict(row) for row in messages]
        return jsonify(messages_list)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == "__main__":
    app.run(debug=True)
