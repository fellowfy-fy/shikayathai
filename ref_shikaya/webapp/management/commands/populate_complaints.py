from django.core.management.base import BaseCommand
from webapp.models import Company, Complaint
import random
import textwrap
# Import or define your functions like generate_complaint_title and generate_complaint_text here

class Command(BaseCommand):
    help = 'Populates the database with fictitious companies and complaints.'

    def handle(self, *args, **options):
        # Predefined lists of words for generating titles and texts
        nouns = ["payment", "refund", "quality", "service", "product", "delivery", "order", "support", "issue", "warranty"]
        verbs = ["delayed", "missing", "damaged", "incorrect", "poor", "broken", "compromised", "unsatisfactory", "rejected", "failed"]
        adjectives = ["urgent", "immediate", "prompt", "quick", "speedy", "efficient", "thorough", "detailed", "complete", "comprehensive"]
        prepositions = ["regarding", "concerning", "about", "related to", "involving", "pertaining to"]

        def generate_sentence(word_count):
            sentence = []
            for _ in range(word_count):
                sentence.append(random.choice([random.choice(nouns), random.choice(verbs), random.choice(adjectives), random.choice(prepositions)]))
            return ' '.join(sentence).capitalize()

        def generate_complaint_title():
            # Generate a somewhat coherent complaint title
            return f"{random.choice(adjectives).capitalize()} {random.choice(nouns)} {random.choice(prepositions)} {random.choice(nouns)}"

        def generate_complaint_text(avg_length=700):
            # Generate complaint text with a length around the average using a normal distribution
            length = int(random.normalvariate(avg_length, avg_length * 0.1))  # 10% standard deviation
            words = textwrap.wrap(generate_sentence(length // 6), width=avg_length)  # Assuming avg word length ~6 chars
            return ' '.join(words)



        company_names = [
            "Alpha Corp", "Beta Solutions", "Gamma Technologies",
            "Delta Innovations", "Epsilon Electronics", "Zeta Industries",
            "Eta Products", "Theta Services", "Iota Creations", "Kappa Enterprises",
            "Lambda Systems", "Mu Designs", "Nu Visions", "Xi Instruments",
            "Omicron Software", "Pi Mechanics", "Rho Networks", "Sigma Builders",
            "Tau Gadgets", "Upsilon Ventures"
        ]

        for name in company_names:
            company, created = Company.objects.get_or_create(name=name)

            self.stdout.write(self.style.SUCCESS(f'Successfully created company "{name}"'))
            for i in range(1, random.randint(10, 30)):
                complaint_title = generate_complaint_title()
                complaint_text = generate_complaint_text()

                complaint = Complaint(
                company=company,
                title=complaint_title,
                text=complaint_text,
                rating=random.randint(0, 5),
                user_id=3           
                )   
                complaint.save()

                self.stdout.write(self.style.SUCCESS(f'Successfully created complaint "{complaint_title}" for "{name}"'))

            
