from flask import Flask, render_template

# Crear una instancia de la aplicación Flask
app = Flask(__name__)

# Ruta para la página principal
@app.route('/')
def home():
    return render_template('index.html')

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)
