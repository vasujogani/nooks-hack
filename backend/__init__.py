#! /usr/bin/python
# ! -*- coding: utf-8 -*-

import sys
import os
import time
from opentok import OpenTok, MediaModes
from videocall import logger_stream

import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(logger_stream)
OPENTOK_APP_ID = "46908704"
OPENTOK_APP_SECRET = "32ffe9a1f88466836e7fa790cdd4f89ab73bbef9"

opentok_sdk = OpenTok("46908704", "32ffe9a1f88466836e7fa790cdd4f89ab73bbef9")


def generate_session():
    session = opentok_sdk.create_session(media_mode=MediaModes.routed)
    # logger.info(f"generate_session: {session.session_id}")
    return session.session_id

