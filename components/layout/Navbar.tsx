import { useAuthStore } from "@/stores/useAuthStore";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { TiGroupOutline } from "react-icons/ti";
import { SiHubspot } from "react-icons/si";
import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { LuMenu } from "react-icons/lu";
import { AuthRoutes, MainRoutes } from "@/types";
import { useLogout } from "@/hooks/api/useAuth";
import { useDisclosure } from "@heroui/modal";
import { PitchModal } from "./PitchModal";
import { useCreateProject } from "@/hooks/api/useProject";

// Sub-components
import { NavItems } from "./navbar/NavItems";
import { UserMenu } from "./navbar/UserMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { MobileMenu } from "./navbar/MobileMenu";

const authRoutes = [
  AuthRoutes.REGISTER,
  AuthRoutes.LOGIN,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.RESET_PASSWORD,
  AuthRoutes.VERIFY_EMAIL,
  AuthRoutes.VERIFY_RESET_OTP,
];

export const Navbar = ({
  session,
  isVerified,
}: {
  session: string | undefined;
  isVerified: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const { user } = useAuthStore();
  const router = useRouter();

  const { mutate: logout } = useLogout();
  const {
    isOpen: isPitchOpen,
    onOpen: onPitchOpen,
    onOpenChange: onPitchOpenChange,
  } = useDisclosure();
  const { mutate: createProject, isPending: isCreatingProject } =
    useCreateProject();

  const isLoggedIn = !!session && isVerified;
  const isAuthPage = authRoutes.includes(pathname as AuthRoutes);
  const isLoginPage = pathname === AuthRoutes.LOGIN;
  const isRegisterPage = pathname === AuthRoutes.REGISTER;

  const handlePitchPress = () => {
    if (user?.hasDraftProjects) {
      onPitchOpen();
    } else {
      createProject(undefined, {
        onSuccess: (response) => {
          router.push(`${MainRoutes.NEW_PROJECT}?id=${response.data.id}`);
        },
      });
    }
  };

  const navItems = useMemo(
    () => [
      {
        label: t("home"),
        href: isLoggedIn ? MainRoutes.HOME : MainRoutes.LANDING,
        icon: <BiHomeAlt2 size={24} />,
      },
      {
        label: isLoggedIn ? t("repo") : t("explore"),
        href: isLoggedIn ? MainRoutes.REPO : MainRoutes.EXPLORE,
        icon: isLoggedIn ? (
          <SiHubspot size={24} />
        ) : (
          <IoTelescopeOutline size={24} />
        ),
      },
      {
        label: t("talents"),
        href: MainRoutes.TALENTS,
        icon: <TiGroupOutline size={24} />,
      },
    ],
    [t, isLoggedIn],
  );

  return (
    <>
      <PitchModal
        isOpen={isPitchOpen}
        onOpenChange={onPitchOpenChange}
        user={user || null}
      />
      <HeroUINavbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        className="bg-white shadow-sm h-20"
        classNames={{
          item: [
            "flex",
            "relative",
            "h-full",
            "items-center",
            "px-2",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-0.5",
            "data-[active=true]:after:bg-primary",
          ],
          wrapper: "h-full container max-w-auto",
        }}
      >
        <NavbarContent justify="start" className="max-w-fit">
          <NavbarBrand className="mr-4">
            <Link href={MainRoutes.LANDING}>
              <Image
                src="/images/logo.png"
                alt={t("logoAlt")}
                width={120}
                height={30}
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-12 ms-10" justify="start">
          {!isAuthPage && <NavItems items={navItems} pathname={pathname} />}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex items-center gap-6">
            {isLoggedIn ? (
              <UserMenu
                user={user || null}
                t={t}
                onLogout={logout}
                onPitchPress={handlePitchPress}
                isCreatingProject={isCreatingProject}
              />
            ) : (
              <AuthButtons
                t={t}
                locale={locale}
                pathname={pathname}
                isAuthPage={isAuthPage}
                isLoginPage={isLoginPage}
                isRegisterPage={isRegisterPage}
              />
            )}
          </NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="lg:hidden text-gray w-14 h-10"
            icon={<LuMenu size={36} />}
          />
        </NavbarContent>

        <MobileMenu
          items={navItems}
          pathname={pathname}
          t={t}
          onClose={() => setIsMenuOpen(false)}
          locale={locale}
          isAuthPage={isAuthPage}
          isLoginPage={isLoginPage}
          isRegisterPage={isRegisterPage}
        />
      </HeroUINavbar>
    </>
  );
};
