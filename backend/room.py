class Room(object):
    def __init__(self, created_at, link_id, session_id):
        self.created_at = created_at
        self.link_id = link_id
        self.session_id = session_id

    @staticmethod
    def from_dict(source):
        # ...

    def to_dict(self):
        # ...

    def __repr__(self):
        return f"Room(\
                created_at={self.created_at}, \
                link_id={self.link_id}, \
                session_id={self.session_id} \
            )"