"""Generate three single-column, searchable, ATS-oriented resumes from verified public records."""
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

out = Path(__file__).resolve().parents[1] / 'public' / 'cv'
out.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor('#202321')
base = ParagraphStyle('base', fontName='Helvetica', fontSize=9.4, leading=13.6, textColor=ink, spaceAfter=3)
heading = ParagraphStyle('heading', parent=base, fontName='Helvetica-Bold', fontSize=10.2, leading=14, spaceBefore=12, spaceAfter=5)
job = ParagraphStyle('job', parent=base, fontName='Helvetica-Bold', spaceBefore=6, spaceAfter=2)
name_style = ParagraphStyle('name', parent=base, fontName='Helvetica-Bold', fontSize=18, leading=22, alignment=TA_CENTER)
center = ParagraphStyle('center', parent=base, alignment=TA_CENTER, fontSize=8.4)

contact = 'aimirihad@gmail.com | +62 813 6014 1594 | github.com/redsandr | linkedin.com/in/rihhadatul-aimi/'
education = 'Bachelor of Accounting, Universitas Syiah Kuala | Aug 2020 - May 2026'

def section(story, title, paragraphs):
    story.append(Paragraph(escape(title.upper()), heading))
    for text in paragraphs:
        story.append(Paragraph(escape(text), base))

def experience(story, title, bullets):
    story.append(KeepTogether([Paragraph(escape(title), job)] + [Paragraph('• ' + escape(line), base) for line in bullets]))

def build(filename, title, summary, skills, jobs, projects):
    story = [Paragraph('Rihhadatul Aimi', name_style), Paragraph(escape(title), center), Paragraph(escape(contact), center), Spacer(1, 7)]
    section(story, 'Profile', [summary])
    section(story, 'Relevant skills', [skills])
    story.append(Paragraph('EXPERIENCE', heading))
    for role, bullets in jobs:
        experience(story, role, bullets)
    story.append(Paragraph('SELECTED PROJECTS', heading))
    for project, details in projects:
        experience(story, project, details)
    section(story, 'Education', [education])
    SimpleDocTemplate(str(out / filename), pagesize=A4, leftMargin=19*mm, rightMargin=19*mm, topMargin=18*mm, bottomMargin=17*mm, title=f'Rihhadatul Aimi - {title}', author='Rihhadatul Aimi').build(story)

build('Rihhadatul_Aimi_AI_Engineering_CV.pdf', 'AI Engineering',
    'AI engineering intern and accounting graduate building evidence-grounded financial research tools and Indonesian-language behavioral finance systems. Experience with local-first retrieval, source verification, and interpretable text classification.',
    'Python; retrieval-augmented generation; SEC 10-K/10-Q filings; document retrieval and reranking; source-quote validation; NLP; rule-based classification; Streamlit; API development; evaluation and test design.',
    [
      ('Backend AI Engineering Intern | FlyRank AI | Jun 2026 - Present | Remote', ['Work on backend AI engineering for an organic-growth platform.']),
      ('Finance Specialist | Flowistic | Jun 2026 - Oct 2026', ['Built double-entry accounting workflows with a 72-account chart of accounts, general journals, ledgers and trial balances.', 'Reconciled four IDR, USD and CNY bank accounts and reconstructed historical transactions from source documents.']),
    ],
    [
      ('RAG Variance Explainer | github.com/redsandr/rag-variance-explainer', ['Built a local SEC-filing research prototype using MD&A retrieval, hybrid search, cross-encoder reranking and source-quote validation. Public website presents a reviewed static case, not hosted AI inference.']),
      ('CogniFi | github.com/redsandr/cognifi', ['Built an interpretable, rule-based Indonesian investor-text bias detector covering FOMO, loss aversion and confirmation bias.', 'Repository reports 94.7% accuracy on a 150-case stratified holdout; metric is project-specific, not a production claim.']),
    ])

build('Rihhadatul_Aimi_Finance_Accounting_CV.pdf', 'Finance and Accounting',
    'Accounting graduate with experience establishing financial controls, reconstructing transactions, reconciling multi-currency accounts and supporting Indonesian tax and payroll administration. Also develops tools for research into financial reporting.',
    'Double-entry bookkeeping; chart of accounts; general journals and ledgers; trial balance; bank reconciliation; IDR/USD/CNY; expense analysis; cash flow; PPh 21; Coretax administration; audit working papers; financial reporting.',
    [
      ('Finance Specialist | Flowistic | Jun 2026 - Oct 2026', ['Established a 72-account chart of accounts and built journal, ledger, trial balance and reporting workflows.', 'Reconstructed Apr-Jul 2026 transactions from bank statements, receipts and reimbursement records.', 'Reconciled four IDR, USD and CNY bank accounts; investigated discrepancies and missing documentation.', 'Supported PPh 21, Coretax registration, BPJS coordination and payroll administration.', 'Prepared management analyses of operating expenses, cash flow, cost projections and financial risks.']),
      ('Junior Auditor Intern | KAP Suryadi dan Rizal | May 2024 - Jun 2024', ['Verified financial data and documented findings in audit working papers for senior auditors.']),
      ('Backend AI Engineering Intern | FlyRank AI | Jun 2026 - Present | Remote', ['Work on backend AI engineering for an organic-growth platform.']),
    ],
    [('RAG Variance Explainer | github.com/redsandr/rag-variance-explainer', ['Created an SEC 10-K/10-Q research prototype that retrieves supporting quotations for financial variance questions.'])])

build('Rihhadatul_Aimi_Creative_3D_CV.pdf', 'Creative and 3D',
    '3D generalist and multidisciplinary content specialist with experience in modeling, rendering, visual storytelling and digital campaigns. Combines production craft with research and measurement.',
    '3D modeling and rendering; visual storytelling; content strategy; campaign planning; audience analysis; social media content; partnership communication; digital menu optimization.',
    [
      ('3D Generalist | Freelance | Feb 2018 - Mar 2025', ['Created 3D models and rendered scenes and characters; selected work is linked from the portfolio website and ArtStation.']),
      ('Content Manager | Freelance | Feb 2025 - Jan 2026', ['Developed beauty-sector content pillars and visual storytelling for TikTok and Instagram; monitored audience engagement.']),
      ('Lead Content Specialist | Aceh Ambil Peran | Jun 2025 - Oct 2025', ['Led socio-cultural research, content campaigns and community engagement in collaboration with partners.']),
      ('Lead | Sate Matang Paknek | Sep 2024 - Oct 2025', ['Led digital menu restructuring and social positioning during a transition to cloud-kitchen operations; reviewed delivery-platform analytics.']),
      ('Partnership Leader | Aureon Automotive | Feb 2024 - Dec 2025 | Remote', ['Coordinated stakeholder communications and partnership outreach for a Germany-based automotive startup.']),
    ],
    [('Selected 3D work | artstation.com/artwork/yJG409 | artstation.com/artwork/2qVVEa', ['Character studies, environment renders and stylized scenes; additional owned work appears on the portfolio website.'])])

print('Generated:', ', '.join(p.name for p in out.iterdir()))
