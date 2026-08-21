from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "127.0.0.1"
PORT = 5500
FRONTEND_DIR = Path(__file__).resolve().parent


class NoCacheRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


# Startet den lokalen Webserver und stellt die Frontend-Dateien bereit.
def main():
    handler = partial(NoCacheRequestHandler, directory=str(FRONTEND_DIR))
    server = ThreadingHTTPServer((HOST, PORT), handler)

    print(f"Frontend läuft auf http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nFrontend-Server wird beendet.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
