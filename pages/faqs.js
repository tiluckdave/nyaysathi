import DashBoardWrapper from "@/components/DashBoardWrapper";
import { Heading,ChakraProvider, CSSReset, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import React from "react";


const FAQPage = () => {
    const faqData = [
      { "question": "Does Indian law allows &apos;registration&apos; of marriage between an Indian with a foreigner?", "answer": "Yes, the Indian law allows registration of marriage between an Indian and a foreigner. According to the Hindu Marriage Act, 1955, the State Government has the authority to make rules for the registration of Hindu marriages. These rules may provide for the entry of particulars of the marriage in a Hindu Marriage Register, which can be used as evidence of the marriage. However, it is not mandatory for all Hindu marriages to be registered. If the State Government has issued a direction for compulsory registration, any person who fails to comply may be fined up to twenty-five rupees."},
      { "question": "Can we take legal actions against a friend who doesn&apos;t return our money?", "answer": "Yes, you can take legal actions against a friend who doesn&apos;t return your money. According to the Indian Contract Act, if someone owes you money and refuses to pay, you have the right to take legal action against them. This can include filing a civil suit for recovery of money or filing a criminal complaint for cheating or fraud. The punishment for cheating under Section 415 of the Indian Penal Code is imprisonment for up to 1 year and/or a fine. However, before taking any legal action, it is advisable to try and resolve the issue amicably through negotiation or mediation." },
      { "question": "Is monitoring someone else social media legal?", "answer": "Yes, it is legal for the Central Government or State Government to issue directions for the interception, monitoring, or decryption of any information on social media platforms or any other computer resource, if they have reason to believe it is necessary for the security and integrity of India or for investigating any offense. This power is granted under Section 69 of the Information Technology Act, 2000. However, the procedure and safeguards for such monitoring must be prescribed. Failure to comply with these directions can result in imprisonment for up to 7 years and a fine."},
      { "question": "Can a customer record a call without the consent of the opposite party?", "answer":"Yes, a customer can record a call without the consent of the opposite party in India. According to Section 162 of the Indian Evidence Act, 1872, any statement made by a person during an investigation can be used as evidence in an inquiry or trial for an offence under investigation. However, the recorded statement can only be used to contradict the witness and cannot be used as evidence in itself. The punishment for recording a call without the consent of the opposite party is imprisonment for up to 3 years or a fine, or both, under Section 166A of the Indian Penal Code."},
      { "question": "Differentiate between an Attorney, an Advocate, lawyer and Solicitor.","answer":"An attorney, advocate, lawyer, and solicitor are all legal professionals who are licensed to practice law. However, there are some differences between them. An attorney is a person who is qualified to represent a client in legal matters and give legal advice. They are typically trained in a specific area of law, such as criminal law, family law, or corporate law. Attorneys may also be referred to as lawyers or legal counsel. An advocate is a lawyer who argues a client&apos;s case before a court or tribunal. They specialize in litigation and are responsible for presenting evidence and making legal arguments on behalf of their client. In some countries, advocates may also provide legal advice and draft legal documents. A lawyer is a general term that can refer to both attorneys and advocates. In some countries, the term lawyer may also be used to refer to someone who has completed a law degree but is not yet licensed to practice law. A solicitor is a legal professional who provides legal advice and assistance to clients. They may also draft legal documents, negotiate on behalf of clients, and represent clients in certain types of court proceedings. In some countries, solicitors work in partnership with barristers, who are responsible for representing clients in court. In summary, an attorney and a lawyer can provide legal advice and represent clients, while an advocate specializes in litigation and a solicitor may provide a range of legal services. The specific roles and responsibilities of these professionals may vary depending on the country and legal system. The punishments for unauthorized practice of law may include fines or imprisonment, depending on the laws of the particular country."},
      { "question": "Who is at fault if someone hits the car from the back because the car in front applied brakes suddenly?","answer":"The person who hit the car from the back would be at fault, as per the Indian Motor Vehicles Act, 1988. Section 198 states that anyone who tampers with the brake or any part of the mechanism of a motor vehicle without lawful authority or reasonable excuse shall be punishable with a fine of up to one hundred rupees. Therefore, the person who hit the car from the back without any lawful reason or excuse would be held responsible for the accident."},
      { "question": "In a road accident is there a way to  identify who is at fault when both drivers blame each other for the accident?","answer":"Yes, there are ways to determine fault in a road accident. According to the Motor Vehicles Act of 1988, if an accident occurs due to the use of a motor vehicle, the owner of the vehicle will be held responsible for any death or permanent disability resulting from the accident. In case of a dispute, the police station or registering authority can provide information about the identification marks and other details of the vehicles involved, as well as the name and address of the person using the vehicle at the time of the accident. The claimant does not need to prove any wrongdoing on the part of the owner or driver of the vehicle. The amount of compensation for death is fixed at fifty thousand rupees, and for permanent disability, it is twenty-five thousand rupees. In addition, the owner of the vehicle may also be liable to pay compensation under other laws in force. If found guilty, the owner may face legal consequences as per the provisions of the Motor Vehicles Act."},
      { "question": "My divorce case is going on for 6 years. My wife is living with another man. Would the charges under Adultery apply to her?","answer":"The charges of adultery may apply to your wife if it is proven that she is living with another man while the divorce case is ongoing. Section 23A of the Hindu Marriage Act allows for counter-claims in divorce proceedings, and if adultery is proven, the court may grant relief to the respondent as if they had filed for it themselves. However, the specific punishment for adultery varies by state and can include imprisonment and/or a fine of up to one lakh rupees."},
      { "question": "Can a customer record a call without the consent of the opposite party?", "answer":"Yes, a customer can record a call without the consent of the opposite party in India. According to Section 162 of the Indian Evidence Act, 1872, any statement made by a person during an investigation can be used as evidence in an inquiry or trial for an offence under investigation. However, the recorded statement can only be used to contradict the witness and cannot be used as evidence in itself. The punishment for recording a call without the consent of the opposite party is imprisonment for up to 3 years or a fine, or both, under Section 166A of the Indian Penal Code."},
      { "question": "Differentiate between an Attorney, an Advocate, lawyer and Solicitor.", "answer":"An attorney, advocate, lawyer, and solicitor are all legal professionals who are licensed to practice law. However, there are some differences between them. An attorney is a person who is qualified to represent a client in legal matters and give legal advice. They are typically trained in a specific area of law, such as criminal law, family law, or corporate law. Attorneys may also be referred to as lawyers or legal counsel. An advocate is a lawyer who argues a client&apos;s case before a court or tribunal. They specialize in litigation and are responsible for presenting evidence and making legal arguments on behalf of their client. In some countries, advocates may also provide legal advice and draft legal documents. A lawyer is a general term that can refer to both attorneys and advocates. In some countries, the term lawyer may also be used to refer to someone who has completed a law degree but is not yet licensed to practice law. A solicitor is a legal professional who provides legal advice and assistance to clients. They may also draft legal documents, negotiate on behalf of clients, and represent clients in certain types of court proceedings. In some countries, solicitors work in partnership with barristers, who are responsible for representing clients in court. In summary, an attorney and a lawyer can provide legal advice and represent clients, while an advocate specializes in litigation and a solicitor may provide a range of legal services. The specific roles and responsibilities of these professionals may vary depending on the country and legal system. The punishments for unauthorized practice of law may include fines or imprisonment, depending on the laws of the particular country."},
      { "question": "Who is at fault if someone hits the car from the back because the car in front applied brakes suddenly?", "answer":"The person who hit the car from the back would be at fault, as per the Indian Motor Vehicles Act, 1988. Section 198 states that anyone who tampers with the brake or any part of the mechanism of a motor vehicle without lawful authority or reasonable excuse shall be punishable with a fine of up to one hundred rupees. Therefore, the person who hit the car from the back without any lawful reason or excuse would be held responsible for the accident."},
      { "question": "In a road accident is there a way to  identify who is at fault when both drivers blame each other for the accident?", "answer":"Yes, there are ways to determine fault in a road accident. According to the Motor Vehicles Act of 1988, if an accident occurs due to the use of a motor vehicle, the owner of the vehicle will be held responsible for any death or permanent disability resulting from the accident. In case of a dispute, the police station or registering authority can provide information about the identification marks and other details of the vehicles involved, as well as the name and address of the person using the vehicle at the time of the accident. The claimant does not need to prove any wrongdoing on the part of the owner or driver of the vehicle. The amount of compensation for death is fixed at fifty thousand rupees, and for permanent disability, it is twenty-five thousand rupees. In addition, the owner of the vehicle may also be liable to pay compensation under other laws in force. If found guilty, the owner may face legal consequences as per the provisions of the Motor Vehicles Act."},
      { "question": "What are the labor laws in India?", "answer":"The primary labor laws in India are the Factories Act, 1948 and the Industrial Disputes Act, 1947. These laws provide for the health, safety, and welfare of workers in factories, as well as the resolution of disputes between employers and employees. Other important laws include the Payment of Wages Act, 1936, the Minimum Wages Act, 1948, and the Employees&apos; Provident Fund and Miscellaneous Provisions Act, 1952. Violation of these laws can result in fines and penalties, as outlined in the respective laws."},
      { "question": "How can I file a case in an Indian court?", "answer":"To file a case in an Indian court, you must first determine the appropriate court to file in based on the subject matter and location of the case. You can then draft a complaint stating the facts and legal basis of your case, and file it with the court along with any necessary fees. The court will then issue a summons to the other party and schedule a hearing. It is recommended to seek the assistance of a lawyer to ensure proper filing and representation in court. The relevant laws and provisions for filing a case in India can be found in the Code of Civil Procedure, 1908 and the Indian Penal Code, 1860. Failure to properly file a case may result in dismissal or other legal consequences."},         
      { "question": "What are the different types of laws in India?", "answer":"There are multiple types of laws in India, including criminal laws, civil laws, corporate laws, labor laws, and tax laws. Criminal laws deal with offenses against the state, while civil laws deal with disputes between individuals or organizations. Corporate laws govern the formation and operation of companies, labor laws regulate the relationship between employers and employees, and tax laws regulate the collection and payment of taxes."},
      { "question": "What are my rights as a tenant/landlord?", "answer":"As a tenant, you have the right to a safe and habitable living space, privacy, and peaceful enjoyment of the property. You also have the right to have your security deposit returned within a reasonable time after moving out, unless there are damages that need to be paid for. As a landlord, you have the right to receive rent on time, have your property maintained and not damaged, and evict a tenant who violates the terms of the lease or does not pay rent. These rights are protected under various laws, such as the Transfer of Property Act, the Rent Control Act, and the Consumer Protection Act. Failure to comply with these laws can result in penalties and legal action."},
      { "question": "What legal recourse do I have if I&apos;m a victim of harassment/discrimination?", "answer":"If you are a victim of harassment or discrimination, you can seek legal recourse through various laws and acts in India. The Indian Penal Code (IPC) has provisions for punishment of harassment and discrimination, such as sections 354A, 354B, 354C, and 354D. You can also file a complaint under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013. In case of discrimination based on caste, religion, race, or gender, you can file a complaint under the Prevention of Atrocities Act, 1989. The punishment for these offences can range from imprisonment to fines, depending on the severity of the case. It is important to consult with a legal advisor or lawyer for specific guidance and assistance in such cases."},
      { "question": "How can I file a police complaint and what are my rights during the investigation process?", "answer":"To file a police complaint, you can make an allegation to a Magistrate, either orally or in writing, that a person has committed a crime. This does not include a police report, but a report made by a police officer after investigation can be considered a complaint. During the investigation process, you have the right to be heard and provide evidence, and the police officer must follow all procedures and collect evidence legally. If you have evidence that may be in a country outside of India, the investigating officer can request a letter of request to be sent to a competent authority in that country to collect evidence. Failure to follow these procedures may result in punishment under the law."},
      { "question": "What are the laws regarding inheritance and property rights in my family?", "answer":"The laws governing inheritance and property rights in your family depend on where the deceased person had their domicile at the time of their death. If they were domiciled in India, the succession to their immovable property will be regulated by Indian law. The succession to their movable property will be regulated by the law of the country where they were domiciled at the time of their death. In case of any disputes, it is advisable to seek legal advice and refer to the relevant laws, such as the Indian Succession Act and the laws of the country where the deceased had their domicile. Punishments for any violations of these laws may include monetary fines or imprisonment, depending on the severity of the offense."},
      { "question": "What are the legal consequences of borrowing money or taking a loan?", "answer":"As a legal advisor, I can inform you that if a borrower residing in the State of Jammu and Kashmir is aggrieved by any order made by the Court of District Judge, they may prefer an appeal to the High Court within thirty days. However, before doing so, the borrower must deposit fifty percent of the debt due from them with the Jammu and Kashmir High Court, or a reduced amount of no less than twenty-five percent with written reasons from the High Court. In cases where a borrower resides in another state, they must make an application to the Court of District Judge in that state, who will then pass an order on the application. It is important to note that the communication of reasons by the secured creditor for not accepting the borrower&apos;s representation or objection does not entitle the borrower to make an application to the Court of District Judge. The punishment for not following these procedures may result in legal consequences, as outlined in the relevant laws and acts."},
      { "question": "What are the different types of contracts and what are the important things to keep in mind when entering into one?", "answer":"There are different types of contracts, such as written contracts, oral contracts, and implied contracts. When entering into a contract, it is important to ensure that all parties involved are competent to contract, and that there is a lawful consideration and object. It is also important to be aware of any laws that may require the contract to be in writing or witnessed, or any laws related to document registration. Additionally, it is important to carefully consider the terms and conditions of the contract and to seek legal advice if needed. It is also important to be aware that agreements in restraint of trade may not be valid, unless specifically provided for in the contract. Punishments for violating contract laws may vary, depending on the specific laws and regulations applicable in each case."},
      { "question": "What are my rights as a consumer and how can I protect myself from unfair trade practices?", "answer":"As a consumer in India, you have the right to seek redressal for any grievances through the Consumer Protection Act, 1986 or any other law in force. This can be done during the pendency of redressal or before filing a complaint under these regulations. The Telecom Regulatory Authority of India Act, 1997 also provides for the enforcement of these regulations by any person delegated with powers by the Authority. If you are a direct to home subscriber, you have the additional right to seek redressal under the Consumer Protection Act, 1986 or any other law in force. To protect yourself from unfair trade practices, you can exercise your rights under these laws and seek redressal for your grievances. The punishment for unfair trade practices can vary depending on the specific law that is violated, but it can include fines, imprisonment, or other penalties."},
      { "question": "What are the laws regarding marriage and divorce in India?", "answer":"The Hindu Marriage Act of 1955 is the primary law governing marriage and divorce in India for Hindus. It applies to all Hindus living in India, except for those living in Jammu and Kashmir. The Act also applies to Hindus living outside of India, as long as they are domiciled in India. Under this Act, Hindu marriages can be registered in a Hindu Marriage Register, which is maintained by the State Government. It is not mandatory to register a marriage, but it can help in providing proof of marriage. If the State Government deems it necessary, they can make registration compulsory and failure to comply can result in a fine of up to twenty-five rupees. The validity of a Hindu marriage is not affected by the failure to register it. Divorce laws in India are also governed by the Hindu Marriage Act, with provisions for both judicial and mutual divorce. Other laws may also apply to marriage and divorce, depending on the religion and personal laws of the individuals involved."},
      { "question": "What are the legal implications of starting a small business or working as a freelancer?", "answer":"The legal implications of starting a small business or working as a freelancer in India can vary depending on the type of business and the location of operation. However, some general laws and regulations that may apply to such activities include the Indian Contract Act, the Income Tax Act, and the Shops and Establishment Act. It is important to comply with these laws to avoid penalties or legal consequences. Additionally, it is advisable to seek legal advice and register your business to protect your intellectual property and assets. Failure to comply with these laws may result in fines, imprisonment, or revocation of business licenses."},
      { "question": "How can I get legal aid or representation if I cannot afford a lawyer?", "answer":"You can receive legal services under the Legal Services Authorities Act, 1987 if you meet any of the following criteria: (a) a member of a Scheduled Caste or Scheduled Tribe, (b) a victim of trafficking in human beings or beggar, (c) a woman or a child, (d) a person with disability, (e) a person under circumstances of undeserved want, (f) an industrial workman, (g) in custody, or (h) in receipt of annual income less than rupees nine thousand or such other higher amount as prescribed by the State or Central Government. To be eligible, you must have a prima facie case to prosecute or defend and can provide an affidavit stating your income. The Central Government may also provide grants to the Central Authority for this purpose. If you do not meet any of these criteria, you can also seek legal aid from NGOs or pro bono lawyers. Failure to provide legal aid to eligible persons may result in penalties under the Legal Services Authorities Act, 1987."},
      { "question": "What are the cyber laws in India, and how can I protect myself online?", "answer":"There are several cyber laws in India that aim to protect individuals and organizations from cyber crimes and ensure the safety of online activities. These include the Information Technology Act, 2000, the Indian Penal Code, and the Indian Copyright Act. To protect yourself online, you can follow some best practices such as using strong passwords, regularly updating your software and devices, being cautious of suspicious emails and websites, and refraining from sharing personal information online. In case of any cyber incident, you can also approach the Indian Computer Emergency Response Team (CERT-In) for assistance. The punishments for cyber crimes can include imprisonment and/or fines, as specified in the relevant laws."},
      { "question": "What are the laws regarding adoption and child custody in India?", "answer":"In India, the laws regarding adoption and child custody are governed by The Hindu Adoptions and Maintenance Act, 1956 and The Guardians and Wards Act, 1890. According to these laws, a person must fulfill certain conditions in order to be eligible for adoption, such as being a Hindu, not already being adopted, not being married (unless there is a custom or usage permitting it), and not being over the age of 15 (unless there is a custom or usage permitting it). These laws also state that in case of a dispute over adoption, the burden of proof lies on the party claiming the adoption. As for child custody, the Guardians and Wards Act allows for the appointment of a guardian for a child in case of the death or incapacity of the natural parents. The punishment for violating these laws may vary depending on the specific circumstances of the case."},
      { "question": "What are the legal implications of using social media for wrong purposes in India?", "answer":"According to the Information Technology Act of 2000, any individual who uses social media for wrong purposes, such as cyberbullying, harassment, or spreading false information, can be penalized by the Cyber Appellate Tribunal. The appellant can either represent themselves or authorize a legal practitioner or officer to present their case. Additionally, the Limitation Act of 1963 may apply to any appeals made to the Cyber Appellate Tribunal. It is important to note that no court has jurisdiction to entertain any suit or proceeding in respect of any matter that can be determined by an adjudicating officer or the Cyber Appellate Tribunal. The punishment for such actions may include fines or imprisonment as determined by the Tribunal."},
      { "question": "What are the laws regarding wills and estate planning in India?", "answer": "In India, the laws regarding wills and estate planning are governed by the Indian Succession Act, 1925. According to this Act, a will must be translated into English or the language commonly used in court proceedings, and this translation must be verified by a court translator or a competent person. The Act also defines terms such as administrator and executor and includes provisions for minors and Indian Christians. The Act also recognizes probate as the copy of a will certified by a court with a grant of administration to the testator&apos;s estate. Violation of these laws may result in legal action and punishment as per the provisions of the Act."},
      { "question": "What are the rights of workers in India, and what recourse do I have if my rights are violated?", "answer": "The rights of workers in India are protected by various laws, such as the Payment of Wages Act, the Weekly Holidays Act, the Minimum Wages Act, the Factories Act, the Plantations Labour Act, the Working Journalists and other Newspaper Employees Act, the Contract Labour (Regulation and Abolition) Act, the Sales Promotion Employees Act, and the Equal Remuneration Act. These laws ensure that workers are paid fair wages, have regular weekly holidays, are provided with minimum wages, have safe working conditions, and are protected against discrimination and exploitation. If your rights as a worker are violated, you can seek legal recourse through the appropriate laws and file a complaint with the relevant authorities. The punishments for violating these laws can include fines, imprisonment, or other penalties as specified in the respective acts."},
      { "question": "What are the laws regarding immigration and visa requirements in India?", "answer": "The Illegal Migrants (Determination by Tribunals) Act, 1983 is the main law regarding immigration and visa requirements in India. This Act allows the Central Government to refer any question about a person&apos;s status as an illegal migrant to a Tribunal for decision. Any person can also apply to the Tribunal for a decision on whether someone is an illegal migrant. However, the application will only be considered if the person in question is found or resides in the same jurisdiction as the applicant&apos;s place of residence. This Act applies to the whole of India and came into force in Assam on October 15, 1983 and in other states on a date appointed by the Central Government. Punishment for illegal migration in India can include deportation and imprisonment."},
      { "question": "What are the legal procedures for filing a lawsuit in India?", "answer": "The legal procedure for filing a lawsuit in India is governed by the Code of Civil Procedure, 1908. The first step is to draft a plaint, which is a written statement of the facts and the relief sought by the plaintiff. The plaintiff then has to pay the necessary court fees and file the plaint in the appropriate court, based on the subject matter and value of the dispute. Upon receiving the plaint, the court will issue a summons to the defendant, requiring them to appear in court and file a written statement in response to the allegations made by the plaintiff. The defendant may also file a counterclaim against the plaintiff, if they have a claim against them. After the written statements have been filed, the court will conduct a preliminary hearing to determine the issues in dispute and may also attempt to settle the matter through mediation or negotiation. If the matter cannot be settled, the court will proceed to hold a trial and both parties will have the opportunity to present their evidence and arguments. Once the trial is concluded, the court will deliver its judgment, which may include a monetary award or other relief to the successful party. In case of any appeal, the matter may be taken to a higher court for review. It is important to note that the Small Cause Court has jurisdiction to try suits where the amount claimed is less than two thousand rupees. Minors can also file suits for amounts up to five hundred rupees for wages or work done as a servant. Any non-judicial or quasi-judicial act required to be done by a judge can be delegated to the Registrar of the Small Cause Court. If a person fails to comply with the legal procedures for filing a lawsuit, they may face penalties such as fines or imprisonment, as provided under the relevant laws. It is advisable to seek legal advice and assistance before initiating any legal action."},
      { "question": "What are the different types of alternative dispute resolution (ADR) methods available in India?", "answer": "In India, there are several types of alternative dispute resolution (ADR) methods available, including arbitration, mediation, conciliation, and negotiation. These methods are governed by various laws and regulations, such as the Arbitration and Conciliation Act, 1996 and the Code of Civil Procedure, 1908. Failure to comply with the prescribed rules and procedures for ADR may result in penalties or legal consequences."},
      { "question": "What are the legal implications of medical negligence in India? ", "answer": "Medical negligence in India is considered a civil wrong and can be punishable under the law of torts. This means that the victim can file a civil lawsuit against the negligent party seeking compensation for any harm or injury caused. Additionally, under the Indian Penal Code, medical negligence can also be considered a criminal offence under section 304A, which deals with causing death by negligence. The punishment for this offence can range from imprisonment for up to two years or a fine, or both. It is also important to note that any medical professional found guilty of medical negligence may face disciplinary action by their respective medical council."},
      { "question": "What are the laws regarding environmental protection in India? ", "answer": "The laws regarding environmental protection in India include the Environment (Protection) Act, 1986, the Water (Prevention and Control of Pollution) Act, 1974, the Air (Prevention and Control of Pollution) Act, 1981, the Forest (Conservation) Act, 1980, the Water (Prevention and Control of Pollution) Cess Act, 1977, the Public Liability Insurance Act, 1991, and the Biological Diversity Act, 2002. These laws aim to protect the environment and its resources, prevent pollution, and provide compensation for any damage caused to the environment. Violations of these laws can result in penalties and punishments as prescribed in the respective acts."},
      { "question": "How can a person acquire Indian citizenship", "answer": "A person can acquire Indian citizenship through naturalization or registration. Naturalization is the process of obtaining citizenship by fulfilling certain requirements and following the necessary procedures, as specified in Section 6 of the Citizenship Act, 1955. This includes submitting an application in Form VIII, providing an undertaking to renounce their previous citizenship, and having adequate knowledge of one of the languages listed in the Eighth Schedule of the Constitution. On the other hand, registration is the process of acquiring citizenship for persons of Indian origin, as outlined in Section 5 of the Citizenship Act, 1955. This includes submitting an application in Form II, providing an undertaking to renounce their previous citizenship, being a resident of India for at least seven years, and taking an oath of allegiance. The punishment for acquiring Indian citizenship through fraudulent means or providing false information is imprisonment for up to five years and/or a fine, as stated in Section 18 of the Citizenship Act, 1955."},
      { "question": "What are the requirements for registering as an overseas citizen of India?", "answer": "The Central Government may, subject to conditions and restrictions, register any person as an overseas citizen of India if they are of Indian origin and a citizen of a specified country, or if they have obtained citizenship of a specified country after the commencement of the Citizenship (Amendment) Act, 2003 and were previously a citizen of India. Minors of such persons may also be registered. Punishment for falsely claiming to be an overseas citizen of India is imprisonment of up to 5 years and/or a fine."},
      { "question": "What are the basic rights and obligations of Indian citizens?", "answer": "The basic rights of Indian citizens include the right to freedom of speech and expression, right to assemble peaceably and without arms, right to form associations or unions, right to move freely throughout the territory of India, right to reside and settle in any part of the territory of India, and the right to practice any profession, occupation, trade or business. These rights are protected under Article 19 of the Indian Constitution. However, these rights are subject to reasonable restrictions in the interests of the sovereignty and integrity of India, security of the state, friendly relations with foreign states, public order, decency and morality, and in relation to contempt of court, defamation, or incitement to an offence. These restrictions are specified in sub-clauses (2) to (6) of Article 19. In addition to these rights, Indian citizens also have certain obligations, such as paying taxes, obeying laws and regulations, and fulfilling their civic duties. Failure to fulfill these obligations can result in penalties or punishments as specified in the relevant laws and acts. For example, failure to pay taxes can result in fines and imprisonment as per the Income Tax Act."},
    ];
  
    return (
      <Box p={4}>
        <Accordion allowToggle>
          {faqData.map((faq, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {faq.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  };

export default function Faqs() {

    return (
        <DashBoardWrapper page="faqs">
           <Heading fontSize="3xl">FAQ&apos;S</Heading>
            <FAQPage/>
    
        </DashBoardWrapper>
    )
}