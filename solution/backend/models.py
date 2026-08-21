from dataclasses import dataclass



# Dieses In-Memory-Modell kann später durch ein SQLAlchemy-Modell ersetzt werden.
@dataclass
class Contact:
   

    id: int
    name: str
    email: str
    phone: str
