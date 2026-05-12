export { GamePlanrNav } from "./GamePlanrNav";
export type { GamePlanrNavProps } from "./GamePlanrNav";
export { LogoIcon } from "./LogoIcon";

// v3 design system
export { TOKENS, COLORS, TYPE, RADIUS, SHADOW, LAYOUT, TINT } from "./tokens";
export type { Tokens, TintName } from "./tokens";

export { StatusPill } from "./components/StatusPill";
export type { StatusPillProps, StatusPillVariant } from "./components/StatusPill";

export { PageHeader } from "./components/PageHeader";
export type { PageHeaderProps } from "./components/PageHeader";

export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState";

export { FontDebugToggle } from "./components/FontDebugToggle";

export { AppSwitcher } from "./components/AppSwitcher";
export type { AppSwitcherProps, AppSwitcherApp, AppId } from "./components/AppSwitcher";

export { AppLauncher, FeaturedHero, CompactCard } from "./components/AppLauncher";
export type {
  AppLauncherProps,
  AppLauncherApp,
  AppLauncherUser,
  AppLauncherHeroProps,
  AppLauncherCardProps,
} from "./components/AppLauncher";

export { AppIcon } from "./components/AppIcon";
export type { AppIconName, AppIconProps } from "./components/AppIcon";

export { GPWordmark, GPMark } from "./components/GPWordmark";
export type { GPWordmarkProps, GPMarkProps } from "./components/GPWordmark";

export { Sidebar } from "./components/Sidebar";
export type { SidebarProps, SidebarNavItemProps } from "./components/Sidebar";

export { MobileBottomNav } from "./components/MobileBottomNav";
export type {
  MobileBottomNavProps,
  MobileBottomNavItemProps,
} from "./components/MobileBottomNav";

export { useIsMobile } from "./hooks/use-mobile";

// v3.2 primitives — Calendar's shadcn-zero gap audit
export { Separator } from "./components/Separator";
export type { SeparatorProps, SeparatorOrientation } from "./components/Separator";

export { Label } from "./components/Label";
export type { LabelProps } from "./components/Label";

export { Skeleton } from "./components/Skeleton";
export type { SkeletonProps } from "./components/Skeleton";

export { Progress } from "./components/Progress";
export type { ProgressProps, ProgressTone } from "./components/Progress";

export { Alert } from "./components/Alert";
export type { AlertProps, AlertTone } from "./components/Alert";

export { Textarea } from "./components/Textarea";
export type { TextareaProps } from "./components/Textarea";

export { Pagination } from "./components/Pagination";
export type { PaginationProps } from "./components/Pagination";

export { Accordion } from "./components/Accordion";
export type { AccordionProps } from "./components/Accordion";

export { Sheet } from "./components/Sheet";
export type { SheetProps, SheetSide, SheetSize } from "./components/Sheet";

export { ConfirmDialog } from "./components/ConfirmDialog";
export type { ConfirmDialogProps, ConfirmTone } from "./components/ConfirmDialog";

export { Tooltip } from "./components/Tooltip";
export type { TooltipProps, TooltipSide } from "./components/Tooltip";

export { Popover } from "./components/Popover";
export type { PopoverProps, PopoverSide, PopoverAlign } from "./components/Popover";

export { Carousel } from "./components/Carousel";
export type { CarouselProps } from "./components/Carousel";

export { Chart } from "./components/Chart";
export type { ChartProps, ChartLegendItem } from "./components/Chart";

// v3.3 — CalendarGrid (requires date-fns as optional peerDep)
export { CalendarGrid } from "./components/CalendarGrid";
export type {
  CalendarGridProps,
  CalendarDayMeta,
  WeekStartsOn,
} from "./components/CalendarGrid";

export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";

export { IconButton } from "./components/IconButton";
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from "./components/IconButton";

export { Input } from "./components/Input";
export type { InputProps, InputSize } from "./components/Input";

export { Select } from "./components/Select";
export type { SelectProps, SelectSize, SelectOption } from "./components/Select";

export { Toggle } from "./components/Toggle";
export type { ToggleProps, ToggleSize } from "./components/Toggle";

export { Tabs } from "./components/Tabs";
export type { TabsProps, TabItem } from "./components/Tabs";

export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";

export { StatCard } from "./components/StatCard";
export type { StatCardProps, StatAccent } from "./components/StatCard";

export { Table } from "./components/Table";
export type {
  TableProps,
  TableRowProps,
  TableHeaderCellProps,
  TableCellProps,
  TableSortDirection,
} from "./components/Table";

export { FilterBar } from "./components/FilterBar";
export type { FilterBarProps } from "./components/FilterBar";

export { Modal } from "./components/Modal";
export type { ModalProps, ModalSize } from "./components/Modal";

export { Toast } from "./components/Toast";
export type { ToastProps, ToastTone } from "./components/Toast";

export { FormField } from "./components/FormField";
export type { FormFieldProps } from "./components/FormField";

export { KPIBar } from "./components/KPIBar";
export type { KPIBarProps, KPIItem } from "./components/KPIBar";

export { DiamondField } from "./components/DiamondField";
export type { DiamondFieldProps, DiamondPlayer, PositionCode } from "./components/DiamondField";
