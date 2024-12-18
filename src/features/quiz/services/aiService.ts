import { AIEnhancedResult, ScoringResult, RiderType } from '../types/quiz.types';

export class AIService {
  private readonly API_URL = '/api/analyze';
  private readonly SYSTEM_PROMPT = `Jesteś ekspertem jeździeckim. Analizujesz wyniki testu jeździeckiego i tworzysz spersonalizowane rekomendacje.
Skupiaj się wyłącznie na aspektach jeździeckich i zawsze uwzględniaj polski kontekst jeździecki.`;

  async enhanceResults(
    scoringResult: ScoringResult,
    answers: string[]
  ): Promise<AIEnhancedResult> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: this.SYSTEM_PROMPT,
          scoringResult,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error('AI Analysis failed');
      }

      return await response.json();
    } catch (error) {
      return this.getFallbackRecommendations(scoringResult.primaryType);
    }
  }

  private getFallbackRecommendations(riderType: RiderType): AIEnhancedResult {
    const fallbackData: Record<RiderType, AIEnhancedResult> = {
      competitive: {
        personalizedAnalysis: 'Wykazujesz silne predyspozycje do jeździectwa sportowego. Twoje podejście do treningu i rozwoju wskazuje na naturalne zdolności w kierunku sportu jeździeckiego.',
        detailedRecommendations: [
          'Rozpocznij regularne treningi z doświadczonym trenerem',
          'Stwórz plan startów w zawodach',
          'Zainwestuj w rozwój techniczny',
          'Rozwijaj wiedzę o treningu sportowym',
          'Zaplanuj systematyczny rozwój w wybranej dyscyplinie'
        ],
        customizedTrainingPlan: 'Tygodniowy plan treningowy:\n- 3-4 treningi pod okiem instruktora\n- 1-2 samodzielne jazdy\n- Regularna praca nad kondycją fizyczną\n- Analiza nagrań z treningów',
        strengthsAndWeaknesses: {
          strengths: ['Determinacja', 'Koncentracja na celach', 'Systematyczność'],
          areasForImprovement: ['Cierpliwość', 'Elastyczność w podejściu']
        },
        longTermVision: 'Rozwój w kierunku sportu wyczynowego z możliwością startów w zawodach regionalnych i krajowych.'
      },
      recreational: {
        personalizedAnalysis: 'Cenisz sobie przyjemność z jazdy i kontakt z koniem. Twoje podejście wskazuje na naturalne predyspozycje do rekreacyjnego jeździectwa.',
        detailedRecommendations: [
          'Rozwijaj się we własnym tempie',
          'Spróbuj różnych stylów jazdy',
          'Skup się na budowaniu więzi z koniem',
          'Dołącz do lokalnej społeczności jeździeckiej',
          'Zaplanuj udział w rekreacyjnych rajdach'
        ],
        customizedTrainingPlan: 'Tygodniowy plan aktywności:\n- 1-2 jazdy rekreacyjne\n- Regularna praca z ziemi\n- Spokojne wyjazdy w teren\n- Czas na pielęgnację i budowanie więzi',
        strengthsAndWeaknesses: {
          strengths: ['Empatia', 'Cierpliwość', 'Spokój'],
          areasForImprovement: ['Technika', 'Regularność treningu']
        },
        longTermVision: 'Rozwój w kierunku świadomego jeźdźca rekreacyjnego, z możliwością udziału w turystyce konnej.'
      },
      trainer: {
        personalizedAnalysis: 'Posiadasz naturalne predyspozycje do nauczania i dzielenia się wiedzą. Twoje podejście wskazuje na potencjał instruktorski.',
        detailedRecommendations: [
          'Rozpocznij kurs instruktorski',
          'Rozwijaj wiedzę teoretyczną',
          'Zdobądź doświadczenie asystując doświadczonym instruktorom',
          'Pogłębiaj znajomość metodyki nauczania',
          'Pracuj nad umiejętnościami komunikacyjnymi'
        ],
        customizedTrainingPlan: 'Plan rozwoju:\n- Regularne szkolenia i warsztaty\n- Praktyka z różnymi końmi\n- Obserwacja doświadczonych instruktorów\n- Rozwój własnych umiejętności jeździeckich',
        strengthsAndWeaknesses: {
          strengths: ['Zdolności pedagogiczne', 'Cierpliwość', 'Analityczne myślenie'],
          areasForImprovement: ['Doświadczenie praktyczne', 'Zarządzanie grupą']
        },
        longTermVision: 'Rozwój kariery instruktorskiej z możliwością prowadzenia własnych szkoleń i kursów.'
      },
      adventurous: {
        personalizedAnalysis: 'Masz duży potencjał w jeździectwie terenowym i rajdowym. Twoje podejście wskazuje na zamiłowanie do przygód i nowych wyzwań.',
        detailedRecommendations: [
          'Rozwijaj umiejętności jazdy terenowej',
          'Zdobądź wiedzę o bezpieczeństwie w terenie',
          'Dołącz do grupy rajdowej',
          'Poznaj podstawy nawigacji',
          'Rozwijaj kondycję swoją i konia'
        ],
        customizedTrainingPlan: 'Plan aktywności:\n- Regularne wyjazdy w teren\n- Trening kondycyjny\n- Praca nad równowagą w różnym terenie\n- Przygotowanie do dłuższych rajdów',
        strengthsAndWeaknesses: {
          strengths: ['Odwaga', 'Samodzielność', 'Adaptacyjność'],
          areasForImprovement: ['Planowanie', 'Technika ujeżdżeniowa']
        },
        longTermVision: 'Rozwój w kierunku jeździectwa terenowego z możliwością udziału w rajdach długodystansowych.'
      }
    };

    return fallbackData[riderType];
  }
}

export const aiService = new AIService();