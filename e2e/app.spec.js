import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // 로그아웃 상태로 초기화
  const logoutButton = await page.$("#logout");
  if (logoutButton) {
    await logoutButton.click();
  }
});

async function login(page) {
  await page.getByRole("link", { name: "로그인" }).click();
  await page.getByPlaceholder("사용자 이름").click();
  await page.getByPlaceholder("사용자 이름").fill("testuser");
  await page.getByPlaceholder("비밀번호").click();
  await page.getByPlaceholder("비밀번호").fill("1234");
  await page.getByRole("button", { name: "로그인" }).click();
}

test.describe("SPA 기본 기능", () => {
  test("기본 라우팅이 동작한다", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "항해플러스" }).first(),
    ).toBeVisible();
    await page.getByRole("link", { name: "로그인" }).click();
    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - textbox "사용자 이름"
    - textbox "비밀번호"
    - button "로그인"
    - link "비밀번호를 잊으셨나요?"
    - separator
    - button "새 계정 만들기"
    `);
    await page.goto("/nonexistent");
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - paragraph: /\\d+/
    - paragraph: 페이지를 찾을 수 없습니다
    - paragraph: 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
    - link "홈으로 돌아가기"
    `);
  });

  test("로그인과 로그아웃이 동작한다", async ({ page }) => {
    await login(page);
    await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
    - navigation:
      - list:
        - listitem:
          - link "홈"
        - listitem:
          - link "프로필"
        - listitem:
          - link "로그아웃"
    `);
    await page.getByRole("link", { name: "로그아웃" }).click();
    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - textbox "사용자 이름"
    - textbox "비밀번호"
    - button "로그인"
    - link "비밀번호를 잊으셨나요?"
    - separator
    - button "새 계정 만들기"
    `);
  });

  test("프로필 페이지가 동작한다", async ({ page }) => {
    // 로그인
    await login(page);

    // 프로필 페이지 접근
    await page.goto("/profile");

    // 프로필 정보 확인
    await expect(page.locator("#username")).toHaveValue("testuser");

    // 프로필 수정
    await page.getByRole("link", { name: "프로필" }).click();
    await page.getByLabel("이메일").click();
    await page.getByLabel("이메일").fill("a@a.aa");
    await page.getByLabel("자기소개").click();
    await page.getByLabel("자기소개").fill("자기소개입니다.");
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "프로필 업데이트" }).click();
    await page.reload();
    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
    - heading "내 프로필" [level=2]
    - text: 사용자 이름
    - textbox "사용자 이름": testuser
    - text: 이메일
    - textbox "이메일": a@a.aa
    - text: 자기소개
    - textbox "자기소개": 자기소개입니다.
    - button "프로필 업데이트"
    `);
  });
});

test.describe("SPA 심화 기능", () => {
  test("해시 기반의 라우팅이 동작한다", async ({ page }) => {
    await page.goto("/index.hash.html");
    await expect(
      page.getByRole("heading", { name: "항해플러스" }).first(),
    ).toBeVisible();

    await page.evaluate(() => {
      window.location.hash = "#/login";
    });

    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - textbox "사용자 이름"
    - textbox "비밀번호"
    - button "로그인"
    - link "비밀번호를 잊으셨나요?"
    - separator
    - button "새 계정 만들기"
    `);

    await page.evaluate(() => {
      window.location.hash = "#/nonexistent";
    });

    await expect(page.getByRole("main")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - paragraph: /\\d+/
    - paragraph: 페이지를 찾을 수 없습니다
    - paragraph: 요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
    - link "홈으로 돌아가기"
    `);
  });

  test("비로그인 상태에서 프로필 페이지 접근이 제한된다", async ({ page }) => {
    await page.goto("/profile");
    // 로그인 페이지로 리다이렉트 됨
    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - textbox "사용자 이름"
    - textbox "비밀번호"
    - button "로그인"
    - link "비밀번호를 잊으셨나요?"
    - separator
    - button "새 계정 만들기"
    `);
  });

  test("로그인된 사용자가 로그인 페이지에 접근시 메인 페이지로 리다이렉트", async ({
    page,
  }) => {
    await login(page);
    await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
    - navigation:
      - list:
        - listitem:
          - link "홈"
        - listitem:
          - link "프로필"
        - listitem:
          - link "로그아웃"
    `);

    await page.goto("/login");
    await expect(page.getByRole("navigation")).toMatchAriaSnapshot(`
    - navigation:
      - list:
        - listitem:
          - link "홈"
        - listitem:
          - link "프로필"
        - listitem:
          - link "로그아웃"
    `);
  });

  test("이벤트 위임이 올바르게 동작한다", async ({ page }) => {
    await page.goto("/");

    // 이벤트의 target과 currentTarget을 비교하는 로직 추가
    await page.evaluate(() => {
      const $loginButton = document.querySelector('a[href="/login"]');
      $loginButton.outerHTML = `<a id="login-link" href="/login" data-link>로그인</a>`;
    });

    // 링크 클릭
    await page.click("#login-link");
    await expect(page.locator("#root")).toMatchAriaSnapshot(`
    - heading "항해플러스" [level=1]
    - textbox "사용자 이름"
    - textbox "비밀번호"
    - button "로그인"
    - link "비밀번호를 잊으셨나요?"
    - separator
    - button "새 계정 만들기"
    `);
  });
});
