from scoring.module import ScoreModule
from core.models import WidgetQset

class Matching(ScoreModule):
    def __init__(self, play):
        opts = self.qset.get("options", {}) if isinstance(self.qset, dict) else {}
        print("==========Widget DEBUG==========")
        print(f"options: {opts}")
        self.is_case_sensitive = opts.get("case_sensitive", False)
        print(f"case_sensitive: {self.is_case_sensitive}")

    def check_answer(self, log):
        question = self.get_question_by_item_id(log.item_id)
        answer = question["answer"][0]["text"]
        user_answer = log.get("text", "")

        if self.is_case_sensitive:
            if answer == user_answer:
                return 100
            else:
                return 0
        else:
            if answer.lower() == user_answer.lower():
                return 100
            else:
                return 0

    # def handle_log_question_answered(self, log):
    #     item_id = log.item_id
    #     # # skip duplicates logs
    #     # if item_id in self.scores:
    #     #     return
    #
    #     score = self.check_answer(log)
    #     self.scores[item_id] = score
    #     self.total_questions += 1
    #     self.verified_score += score

