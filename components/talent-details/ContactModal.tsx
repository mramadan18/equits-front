"use client";

import { useTranslations } from "next-intl";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Button,
} from "@heroui/react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";
import { User } from "@/types/api";

interface ContactModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  talent: User;
}

export const ContactModal = ({
  isOpen,
  onOpenChange,
  talent,
}: ContactModalProps) => {
  const t = useTranslations("TalentDetails");

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      backdrop="blur"
      radius="lg"
      classNames={{
        backdrop: "bg-black/30 backdrop-blur-md",
        base: "border border-gray-100 shadow-2xl",
        header: "border-b border-gray-100 pb-4",
        footer: "border-t border-gray-100 pt-4",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-dark">
              {t("contactInfo")}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-6 py-6">
                {/* Name Card Summary */}
                <div className="flex items-center gap-4 mb-2">
                  <Avatar
                    src={`${talent?.avatar}`}
                    color="primary"
                    showFallback
                    className="w-14 h-14 text-lg"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-dark">
                      {talent?.firstName} {talent?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      {talent?.jobTitle}
                    </p>
                  </div>
                </div>

                {/* Contact Email */}
                {talent?.contactEmail && (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 group hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                      <FaEnvelope size={20} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        Email
                      </span>
                      <a
                        href={`mailto:${talent.contactEmail}`}
                        className="text-sm md:text-base font-bold text-dark truncate hover:text-primary transition-colors"
                      >
                        {talent.contactEmail}
                      </a>
                    </div>
                  </div>
                )}

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {talent?.facebookUrl && (
                    <Link
                      href={talent.facebookUrl}
                      target="_blank"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-all text-blue-600 group"
                    >
                      <FaFacebook
                        size={22}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-bold">Facebook</span>
                    </Link>
                  )}
                  {talent?.linkedinUrl && (
                    <Link
                      href={talent.linkedinUrl}
                      target="_blank"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100/50 hover:bg-sky-50 hover:border-sky-200 transition-all text-sky-700 group"
                    >
                      <FaLinkedin
                        size={22}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-bold">LinkedIn</span>
                    </Link>
                  )}
                  {talent?.instagramUrl && (
                    <Link
                      href={talent.instagramUrl}
                      target="_blank"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-pink-50/50 border border-pink-100/50 hover:bg-pink-50 hover:border-pink-200 transition-all text-pink-600 group"
                    >
                      <FaInstagram
                        size={22}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-bold">Instagram</span>
                    </Link>
                  )}
                  {talent?.youtubeUrl && (
                    <Link
                      href={talent.youtubeUrl}
                      target="_blank"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-50/50 border border-red-100/50 hover:bg-red-50 hover:border-red-200 transition-all text-red-600 group"
                    >
                      <FaYoutube
                        size={22}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-sm font-bold">YouTube</span>
                    </Link>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="font-bold"
              >
                {t("close")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
