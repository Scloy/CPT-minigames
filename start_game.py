import http.server
import socketserver
import webbrowser
import os
import sys

# Configurações
PORT = 8000
DIRECTORY = "dist"

def run_server():
    # Verifica se a pasta 'dist' existe
    if not os.path.exists(DIRECTORY):
        print(f"Erro: A pasta '{DIRECTORY}' não foi encontrada.")
        print("Certifique-se de que você executou 'npm run build' antes de compactar o arquivo.")
        input("Pressione Enter para sair...")
        sys.exit(1)

    os.chdir(DIRECTORY)
    
    Handler = http.server.SimpleHTTPRequestHandler
    
    # Adiciona suporte a tipos MIME para módulos JS (necessário para o Vite)
    Handler.extensions_map.update({
        '.js': 'application/javascript',
    })

    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            url = f"http://localhost:{PORT}"
            print(f"Servidor iniciado em: {url}")
            print("Abrindo o navegador automaticamente...")
            print("Pressione Ctrl+C para encerrar o servidor.")
            
            # Abre o navegador
            webbrowser.open(url)
            
            # Mantém o servidor rodando
            httpd.serve_forever()
    except Exception as e:
        print(f"Erro ao iniciar o servidor: {e}")
        input("Pressione Enter para sair...")

if __name__ == "__main__":
    run_server()
