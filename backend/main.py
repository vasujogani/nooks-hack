#! /usr/bin/python
# ! -*- coding: utf-8 -*-

import sys
import os
import time
import string
import random
from opentok import OpenTok, MediaModes
from .room import Room

OPENTOK_APP_ID = "46908704"
OPENTOK_APP_SECRET = "32ffe9a1f88466836e7fa790cdd4f89ab73bbef9"

opentok_sdk = OpenTok("46908704", "32ffe9a1f88466836e7fa790cdd4f89ab73bbef9")


def generate_session():
    session = opentok_sdk.create_session(media_mode=MediaModes.routed)
    return session.session_id

doc_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 32))

room = Room(
    created_at = time.time(),
    link_id = doc_id,
    session_id = generate_session()
)

await db.collection("rooms").document(doc_id).set(room.to_dict())