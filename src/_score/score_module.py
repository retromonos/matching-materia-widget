from scoring.module import ScoreModule
from core.models import WidgetQset

class Matching(ScoreModule):
    def check_answer(self, log):
        question = self.get_question_by_item_id(log.item_id)
        answer = question["answers"][0]["text"]
        user_answer = getattr(log, "text", "")

        if answer == user_answer:
            return 100
        else:
            return 0

