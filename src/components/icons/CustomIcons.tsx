import React from 'react';
import {
  CalendarBlank,
  Sun,
  Moon,
  Coins,
  TrendUp,
  Compass,
  Flame,
  Clock,
  Diamond,
  Phone,
  WhatsappLogo,
  MapPin,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  CaretDown,
  CaretRight,
  CaretLeft,
  List,
  X,
  Sparkle,
  Star,
  Globe,
  ArrowsClockwise,
  Plant,
  Stack,
  Bag,
  EnvelopeSimple,
  Handshake,
  Users,
  House,
  ArrowLeft,
  BookOpen,
  Heart,
  Briefcase,
  Buildings,
  Medal,
  MagnifyingGlass,
  Funnel,
  Check,
  LockSimple,
  ChatCircleDots,
  ArrowSquareOut,
  Pulse,
  Quotes,
  PaperPlaneRight,
  VideoCamera,
  User,
  Code,
  Database,
  TerminalWindow,
  Scroll,
  IconWeight,
} from '@phosphor-icons/react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  weight?: IconWeight;
  color?: string;
  mirrored?: boolean;
}

// 1. Calendar / Patro Icon -> Phosphor CalendarBlank
export function IconCalendar({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <CalendarBlank size={size} className={className} weight={weight} {...(props as any)} />;
}

// 2. Surya / Sun Icon -> Phosphor Sun
export function IconSun({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Sun size={size} className={className} weight={weight} {...(props as any)} />;
}

// 3. Chandra / Moon Icon -> Phosphor Moon
export function IconMoon({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Moon size={size} className={className} weight={weight} {...(props as any)} />;
}

// 4. Gold / Bullion / Coins Icon -> Phosphor Coins
export function IconCoins({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Coins size={size} className={className} weight={weight} {...(props as any)} />;
}

// 5. Forex / Currency Exchange Icon -> Phosphor TrendUp
export function IconTrendingUp({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <TrendUp size={size} className={className} weight={weight} {...(props as any)} />;
}

// 6. Kundali / Astrology / Star Icon -> Phosphor Scroll
export function IconKundali({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Scroll size={size} className={className} weight={weight} {...(props as any)} />;
}

// 7. Vastu / Compass Icon -> Phosphor Compass
export function IconCompass({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Compass size={size} className={className} weight={weight} {...(props as any)} />;
}

// 8. Karmakanda / Sacred Fire Icon -> Phosphor Flame
export function IconFlame({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Flame size={size} className={className} weight={weight} {...(props as any)} />;
}

// 9. Muhurta / Clock Icon -> Phosphor Clock
export function IconClock({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Clock size={size} className={className} weight={weight} {...(props as any)} />;
}

// 10. Gemstone / Ratna Icon -> Phosphor Diamond
export function IconGem({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Diamond size={size} className={className} weight={weight} {...(props as any)} />;
}

// 11. Phone Icon -> Phosphor Phone
export function IconPhone({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Phone size={size} className={className} weight={weight} {...(props as any)} />;
}

// 12. WhatsApp Icon -> Phosphor WhatsappLogo
export function IconWhatsApp({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <WhatsappLogo size={size} className={className} weight={weight} {...(props as any)} />;
}

// 13. MapPin / Location Icon -> Phosphor MapPin
export function IconMapPin({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <MapPin size={size} className={className} weight={weight} {...(props as any)} />;
}

// 14. ArrowRight Icon -> Phosphor ArrowRight
export function IconArrowRight({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ArrowRight size={size} className={className} weight={weight} {...(props as any)} />;
}

// 15. CheckCircle2 / Verified Icon -> Phosphor CheckCircle
export function IconCheckCircle({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <CheckCircle size={size} className={className} weight={weight} {...(props as any)} />;
}

// 16. Shield / Protection Icon -> Phosphor ShieldCheck
export function IconShield({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ShieldCheck size={size} className={className} weight={weight} {...(props as any)} />;
}

// 17. ChevronDown Icon -> Phosphor CaretDown
export function IconChevronDown({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <CaretDown size={size} className={className} weight={weight} {...(props as any)} />;
}

// 18. ChevronRight Icon -> Phosphor CaretRight
export function IconChevronRight({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <CaretRight size={size} className={className} weight={weight} {...(props as any)} />;
}

// 19. ChevronLeft Icon -> Phosphor CaretLeft
export function IconChevronLeft({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <CaretLeft size={size} className={className} weight={weight} {...(props as any)} />;
}

// 20. MenuBars Icon -> Phosphor List
export function IconMenu({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <List size={size} className={className} weight={weight} {...(props as any)} />;
}

// 21. CloseX Icon -> Phosphor X
export function IconClose({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <X size={size} className={className} weight={weight} {...(props as any)} />;
}

// 22. Sparkles / Radiance Icon -> Phosphor Sparkle
export function IconSparkles({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Sparkle size={size} className={className} weight={weight} {...(props as any)} />;
}

// 23. Star Icon -> Phosphor Star
export function IconStar({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Star size={size} className={className} weight={weight} {...(props as any)} />;
}

// 24. Globe Icon -> Phosphor Globe
export function IconGlobe({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Globe size={size} className={className} weight={weight} {...(props as any)} />;
}

// 25. Refresh Icon -> Phosphor ArrowsClockwise
export function IconRefresh({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ArrowsClockwise size={size} className={className} weight={weight} {...(props as any)} />;
}

// 26. Leaf / Tulsi Icon -> Phosphor Plant
export function IconLeaf({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Plant size={size} className={className} weight={weight} {...(props as any)} />;
}

// 27. Layers / Matrix Icon -> Phosphor Stack
export function IconLayers({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Stack size={size} className={className} weight={weight} {...(props as any)} />;
}

// 28. ShoppingBag / Store Icon -> Phosphor Bag
export function IconShoppingBag({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Bag size={size} className={className} weight={weight} {...(props as any)} />;
}

// 29. Mail Icon -> Phosphor EnvelopeSimple
export function IconMail({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <EnvelopeSimple size={size} className={className} weight={weight} {...(props as any)} />;
}

// 30. HeartHandshake Icon -> Phosphor Handshake
export function IconHeartHandshake({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Handshake size={size} className={className} weight={weight} {...(props as any)} />;
}

// 31. Users / Sangha Icon -> Phosphor Users
export function IconUsers({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Users size={size} className={className} weight={weight} {...(props as any)} />;
}

// 32. Home Icon -> Phosphor House
export function IconHome({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <House size={size} className={className} weight={weight} {...(props as any)} />;
}

// 33. ArrowLeft Icon -> Phosphor ArrowLeft
export function IconArrowLeft({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ArrowLeft size={size} className={className} weight={weight} {...(props as any)} />;
}

// 34. BookOpen Icon -> Phosphor BookOpen
export function IconBookOpen({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <BookOpen size={size} className={className} weight={weight} {...(props as any)} />;
}

// 35. Heart Icon -> Phosphor Heart
export function IconHeart({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Heart size={size} className={className} weight={weight} {...(props as any)} />;
}

// 36. Briefcase Icon -> Phosphor Briefcase
export function IconBriefcase({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Briefcase size={size} className={className} weight={weight} {...(props as any)} />;
}

// 37. Building Icon -> Phosphor Buildings
export function IconBuilding({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Buildings size={size} className={className} weight={weight} {...(props as any)} />;
}

// 38. Award Icon -> Phosphor Medal
export function IconAward({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Medal size={size} className={className} weight={weight} {...(props as any)} />;
}

// 39. Search Icon -> Phosphor MagnifyingGlass
export function IconSearch({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <MagnifyingGlass size={size} className={className} weight={weight} {...(props as any)} />;
}

// 40. Filter Icon -> Phosphor Funnel
export function IconFilter({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Funnel size={size} className={className} weight={weight} {...(props as any)} />;
}

// 41. Check Icon -> Phosphor Check
export function IconCheck({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Check size={size} className={className} weight={weight} {...(props as any)} />;
}

// 42. Lock Icon -> Phosphor LockSimple
export function IconLock({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <LockSimple size={size} className={className} weight={weight} {...(props as any)} />;
}

// 43. MessageCircle Icon -> Phosphor ChatCircleDots
export function IconMessageCircle({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ChatCircleDots size={size} className={className} weight={weight} {...(props as any)} />;
}

// 44. ExternalLink Icon -> Phosphor ArrowSquareOut
export function IconExternalLink({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <ArrowSquareOut size={size} className={className} weight={weight} {...(props as any)} />;
}

// 45. Activity / Pulse Icon -> Phosphor Pulse
export function IconActivity({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Pulse size={size} className={className} weight={weight} {...(props as any)} />;
}

// 46. Quote Icon -> Phosphor Quotes
export function IconQuote({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Quotes size={size} className={className} weight={weight} {...(props as any)} />;
}

// 47. Send Icon -> Phosphor PaperPlaneRight
export function IconSend({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <PaperPlaneRight size={size} className={className} weight={weight} {...(props as any)} />;
}

// 48. Video Icon -> Phosphor VideoCamera
export function IconVideo({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <VideoCamera size={size} className={className} weight={weight} {...(props as any)} />;
}

// 49. User Icon -> Phosphor User
export function IconUser({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <User size={size} className={className} weight={weight} {...(props as any)} />;
}

// 50. Code Icon -> Phosphor Code
export function IconCode({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Code size={size} className={className} weight={weight} {...(props as any)} />;
}

// 51. Database Icon -> Phosphor Database
export function IconDatabase({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <Database size={size} className={className} weight={weight} {...(props as any)} />;
}

// 52. Terminal Icon -> Phosphor TerminalWindow
export function IconTerminal({ size = 20, className = '', weight = 'regular', ...props }: IconProps) {
  return <TerminalWindow size={size} className={className} weight={weight} {...(props as any)} />;
}

