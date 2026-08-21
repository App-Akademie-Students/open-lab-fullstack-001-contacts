from fastapi import APIRouter, HTTPException
from models import Contact
from schemas import ContactCreate, ContactRead

router = APIRouter()
contacts = [
    Contact(1, "Anna Müller", "anna@example.com", "0123 456789"),
    Contact(2, "Max Mustermann", "max@example.com", "0987 654321")

]

# Die nächste verfügbare ID für neue Kontakte wird berechnet,
# indem die maximale ID der vorhandenen Kontakte ermittelt und um 1 erhöht wird.
next_id = max((contact.id for contact in contacts), default=0) + 1


# Gibt alle gespeicherten Kontakte zurück.
@router.get("/contacts", response_model=list[ContactRead])
def get_contacts():
    return contacts


# Liefert einen einzelnen Kontakt anhand seiner ID oder wirft einen 404-Fehler.
@router.get("/contacts/{contact_id}", response_model=ContactRead)
def get_contact(contact_id: int):
    for contact in contacts:
        if contact.id == contact_id:
            return contact

    raise HTTPException(status_code=404, detail="Contact not found")


# Erstellt einen neuen Kontakt aus den Formulardaten und speichert ihn in der Liste.
@router.post("/contacts", response_model=ContactRead)
def create_contact(contact: ContactCreate):
    global next_id

    new_contact = Contact(
        id=next_id,
        name=contact.name,
        email=contact.email,
        phone=contact.phone
    )
    next_id += 1
    contacts.append(new_contact)
    return new_contact


# Löscht einen Kontakt anhand seiner ID und meldet einen Fehler, falls er nicht existiert.
@router.delete("/contacts/{contact_id}")
def delete_contact(contact_id: int):
    for contact in contacts:
        if contact.id == contact_id:
            contacts.remove(contact)
            return {"message": "Contact deleted"}

    raise HTTPException(status_code=404, detail="Contact not found")
